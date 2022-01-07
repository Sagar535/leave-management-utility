class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # :registerable,
  devise :database_authenticatable, :recoverable, :rememberable, :validatable
  enum role: { user: 0, admin: 1 }
  has_many :leave_requests
  has_many :approved_leave_requests, class_name: 'LeaveRequest', foreign_key: :approver_id, dependent: :nullify, inverse_of: :approver
  has_many :leave_balances
  validates :first_name, :last_name, :join_date, presence: true

  # multiply working months with multiplier to get the balance
  MULTIPLIER = 1.5
  SICK_LEAVE = 5
  UNPAID_LEAVE = 25

  def sick_leave_balance
    spent = 0
    leave_requests.where(status: 'approved')
                  .where('start > ? and end_date < ?',Fiscal.start_date, Fiscal.next_date).each do |leave_request|
      spent += leave_request.duration
    end

    SICK_LEAVE - spent
  end

  def upcoming_leaves
    leave_requests.where("end_date > ?", Time.zone.today)
  end

  def paid_leave_balance
    MULTIPLIER * working_months
  end

  def working_months
    # implies user has worked in the company for more than a year so is expected to work for 12 months
    return 12 if (Time.zone.today - join_date).to_i > (12 * 30)

    # needs to divide by 30 as the difference result is in days
    (Fiscal.next_date - join_date).to_f / 30
  end
end
