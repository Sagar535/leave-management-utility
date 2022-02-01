class TaxRuleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :amount_from, :amount_to, :rate
end
