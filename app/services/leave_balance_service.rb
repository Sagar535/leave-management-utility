class LeaveBalanceService
  attr_reader :user, :fiscal_year

  delegate :leave_requests, :join_date, to: :user

  # multiply working months with multiplier to get the balance
  MULTIPLIER = 1.5
  SICK_LEAVE = 5
  UNPAID_LEAVE = 25

  def initialize(user, fiscal_year = nil)
    @user = user
    @fiscal_year = fiscal_year
  end

  def sick_leave_balance
    SICK_LEAVE - sick_leave_duration
  end

  def paid_leave_balance
    total_paid_leave = MULTIPLIER * working_months
    paid_leave = sick_leave_balance.negative? ? (total_paid_leave - sick_leave_balance.abs) : total_paid_leave

    paid_leave - non_sick_leave_duration
  rescue Exceptions::InvalidRecord
    # for invalid record no leave balance
    # Fix validity to get the leave balance
    0
  end

  def unpaid_leave_balance
    paid_leave_balance.negative? ? (UNPAID_LEAVE - paid_leave_balance.abs) : UNPAID_LEAVE
  end

  private

  def sick_leave_duration
    relevant_leave_requests.where(status: 'approved', leave_type: 'sick_leave')
                           .sum(&:duration)
  end

  def non_sick_leave_duration
    relevant_leave_requests.where(status: 'approved')
                           .where.not(leave_type: 'sick_leave')
                           .sum(&:duration)
  end

  def relevant_leave_requests
    leave_requests.where('start_date > ? and end_date < ?', Fiscal.start_date(fiscal_year), Fiscal.next_date(fiscal_year))
  end

  def working_months
    raise(Exceptions::InvalidRecord, "Join date is not present for user with id #{user.id}") if join_date.blank?
    # implies user has worked in the company for more than a year so is expected to work for 12 months
    return 12 if (Time.zone.today - join_date).to_i > (12 * 30)

    # needs to divide by 30 as the difference result is in days
    (Fiscal.next_date - join_date).to_f / 30
  end
end

