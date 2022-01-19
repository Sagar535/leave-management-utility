class TaxRule < ApplicationRecord
  belongs_to :salary_setting, optional: true
  has_many :tax_rule_items, dependent: :destroy

  validates :from_date, :name, presence: true
end
