class CreateTaxRuleItems < ActiveRecord::Migration[6.1]
  def change
    create_table :tax_rule_items do |t|
      t.belongs_to :tax_rule, index: true
      t.decimal :amount_from
      t.decimal :amount_to
      t.decimal :rate
      t.string :tax_name

      t.timestamps
    end
  end
end
