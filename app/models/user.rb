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


  def sick_leave_balance(fy=nil)
    LeaveBalanceService.new(self, fy).sick_leave_balance
  end

  def upcoming_leaves
    leave_requests.where("end_date > ?", Time.zone.today)
  end

  def paid_leave_balance(fy=nil)
    LeaveBalanceService.new(self, fy).paid_leave_balance
  end

  def unpaid_leave_balance(fy=nil)
    LeaveBalanceService.new(self, fy).unpaid_leave_balance
  end
end
