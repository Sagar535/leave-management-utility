class UserSalary < ApplicationRecord
  belongs_to :user
  belongs_to :salary

  validates :start_date, presence: true
end
