class RemoveDateFromTaxRule < ActiveRecord::Migration[6.1]
  def change
    remove_column :tax_rules, :from_date
    remove_column :tax_rules, :to_date
  end
end
