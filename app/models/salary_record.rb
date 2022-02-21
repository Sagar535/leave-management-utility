class SalaryRecord < ApplicationRecord
  belongs_to :user

  validates :allowance, :ssf_office, :ssf_employee, :income_tax, :net_ctc, :cash_in_hand, :monthly_dispatch, presence: true, numericality: { greater_than: 0 }
end
