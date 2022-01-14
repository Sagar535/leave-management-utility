class CreateTaxRules < ActiveRecord::Migration[6.1]
  def change
    create_table :tax_rules do |t|
      t.belongs_to :salary_setting, index: true
      t.date :from_date
      t.date :to_date

      t.timestamps
    end
  end
end
