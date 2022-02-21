class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # :registerable,
  devise :database_authenticatable, :recoverable, :rememberable, :validatable
  enum role: { user: 0, admin: 1 }
  belongs_to :salary_setting
  has_many :leave_requests
  has_many :approved_leave_requests, class_name: 'LeaveRequest', foreign_key: :approver_id, dependent: :nullify, inverse_of: :approver

  has_many :user_salaries
  has_many :salaries, through: :user_salaries
  has_many :leave_balances, dependent: :destroy
  has_many :salary_records, dependent: :nullify

  validates :first_name, :last_name, :start_date, presence: true
  validates :email, presence: true, uniqueness: true

  def upcoming_leaves
    leave_requests.where("end_date > ?", Time.zone.today)
  end

  def leave_request_days_count
    leave_requests.sum(&:duration)
  end

  def sick_leave_balance(fiscal_year = nil)
    LeaveBalanceService.new(self, fiscal_year).sick_leave_balance
  end

  def paid_leave_balance(fiscal_year = nil)
    LeaveBalanceService.new(self, fiscal_year).paid_leave_balance
  end

  def unpaid_leave_balance(fiscal_year = nil)
    LeaveBalanceService.new(self, fiscal_year).unpaid_leave_balance
  end

  # TODO: test is required
  def active_salary(date=nil)
    # return latest when date is not given
    return user_salaries.order(start_date: :desc).first&.salary if date.blank?

    # active salary for a given date
    user_salaries.where('start_date <= ?', date).order(start_date: :desc).first&.salary
  end
end
