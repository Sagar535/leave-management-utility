class TaxRuleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :from_date, :to_date, :name
end