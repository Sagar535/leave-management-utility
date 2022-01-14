class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # :registerable,
  devise :database_authenticatable, :recoverable, :rememberable, :validatable
  enum role: { user: 0, admin: 1 }
  has_many :leave_requests
  has_many :approved_leave_requests, class_name: 'LeaveRequest', foreign_key: :approver_id, dependent: :nullify, inverse_of: :approver
  has_many :salaries, dependent: :destroy

  has_one :active_salary, -> { where(active: true) }, class_name: 'Salary', dependent: :destroy, inverse_of: :user

  validates :first_name, :last_name, presence: true

  def upcoming_leaves
    leave_requests.where("end_date > ?", Time.zone.today)
  end
end
