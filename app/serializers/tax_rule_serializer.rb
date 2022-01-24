class TaxRuleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :from_date, :to_date, :name

  has_many :tax_rule_items
end
