class SalariesSettingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :ssf_office, :ssf_employee, :life_insurance_max, :ssf_tax_exemption_rate, :ssf_tax_exemption_max
  has_many :users
  has_many :tax_rules
end
