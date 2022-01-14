class Salary < ApplicationRecord
  belongs_to :user

  validates :basic_salary, :commitment_bonus, :from_date, :to_date, presence: true
  validates :active, uniqueness: { scope: :user }, if: :active
end
