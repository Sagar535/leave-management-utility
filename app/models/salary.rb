class Salary < ApplicationRecord
  has_many :user_salaries
  has_many :users, through: :user_salaries

  validates :basic_salary, :commitment_bonus, :allowance, :festival_bonus, :monthly_dispatch, presence: true
end
