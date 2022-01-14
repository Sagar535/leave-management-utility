class TaxRuleItem < ApplicationRecord
  belongs_to :tax_rule

  validates :amount_from, :amount_to, :rate, presence: true
end
