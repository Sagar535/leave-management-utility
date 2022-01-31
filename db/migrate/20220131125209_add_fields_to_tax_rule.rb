class AddFieldsToTaxRule < ActiveRecord::Migration[6.1]
  def change
    add_column :tax_rules, :amount_from, :decimal
    add_column :tax_rules, :amount_to, :decimal
    add_column :tax_rules, :rate, :decimal
  end
end
