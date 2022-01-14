class CreateSalarySettings < ActiveRecord::Migration[6.1]
  def change
    create_table :salary_settings do |t|
      t.decimal :ssf_office
      t.decimal :ssf_employee
      t.decimal :life_insurance_max
      t.decimal :ssf_tax_exemption_rate
      t.decimal :ssf_tax_exemption_max

      t.timestamps
    end
  end
end
