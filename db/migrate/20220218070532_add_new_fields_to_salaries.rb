class AddNewFieldsToSalaries < ActiveRecord::Migration[6.1]
  def change
    add_column :salaries, :festival_bonus, :decimal
    add_column :salaries, :allowance, :decimal
    add_column :salaries, :life_insurance_deduction, :decimal
    add_column :salaries, :income_tax, :decimal

    # net ctc is to be calculated, might not need the field
    add_column :salaries, :net_ctc, :decimal
    add_column :salaries, :cash_in_hand, :decimal
    add_column :salaries, :monthly_dispatch, :decimal
  end
end
