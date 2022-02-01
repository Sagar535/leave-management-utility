class TaxRuleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :from_date, :to_date, :name, :amount_from, :amount_to, :rate
end
