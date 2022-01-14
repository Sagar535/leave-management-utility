class TaxRule < ApplicationRecord
  belongs_to :salary_setting
  has_many :tax_rule_items, dependent: :destroy

  validates :from_date, presence: true
end
