class TaxRuleItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :amount_from, :amount_to, :rate

  belongs_to :tax_rule
end
