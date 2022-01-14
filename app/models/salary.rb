class Salary < ApplicationRecord
  belongs_to :user
  has_many :tax_rules

  validates :basic_salary, :commitment_bonus, :from_date, presence: true
  validates :to_date, presence: true, unless: :active?
  validates :active, uniqueness: { scope: :user }, if: :active
end
