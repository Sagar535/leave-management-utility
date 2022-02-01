class TaxRule < ApplicationRecord
  belongs_to :salary_setting, optional: true

  validates :amount_to, :amount_from, :rate, presence: true
end
