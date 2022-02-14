class LeaveBalanceService
  attr_reader :user, :fiscal_year

  delegate :leave_requests, :start_date, to: :user

  # multiply working months with PAID_LEAVE_FACTOR to get the balance
  PAID_LEAVE_FACTOR = 1.5
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
    total_paid_leave = PAID_LEAVE_FACTOR * working_months
    paid_leave = sick_leave_balance.negative? ? (total_paid_leave - sick_leave_balance.abs) : total_paid_leave

    paid_leave - non_sick_leave_duration
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
    leave_requests.where('start_date > ? and end_date < ?', FiscalYear.start_date(fiscal_year), FiscalYear.next_fiscal_year_start_date(fiscal_year))
  end

  def working_months
    # implies user has worked in the company for more than a year so is expected to work for 12 months
    return 12 if (Time.zone.today - start_date).to_i > (12 * 30)

    # needs to divide by 30 as the difference result is in days
    (FiscalYear.next_fiscal_year_start_date - start_date).to_f / 30
  end
end

