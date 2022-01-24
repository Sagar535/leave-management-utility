class TaxRuleItem < ApplicationRecord
  belongs_to :tax_rule, optional: true

  validates :amount_from, :amount_to, :rate, presence: true
end
