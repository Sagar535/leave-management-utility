class SalarySetting < ApplicationRecord
  has_many :salaries, dependent: :nullify
  has_many :tax_rules, dependent: :nullify

  validates :ssf_office, :ssf_employee, presence: true, numericality: { greater_than: 0, less_than: 100 }
  validates  :life_insurance_max, :ssf_tax_exemption_rate, :ssf_tax_exemption_max, presence: true
end
