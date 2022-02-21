class CreateSalaryRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :salary_records do |t|
      t.belongs_to :user
      t.decimal :allowance
      t.decimal :ssf_office
      t.decimal :ssf_employee
      t.decimal :festival_bonus
      t.decimal :life_insurance_deduction
      t.decimal :income_tax
      t.decimal :net_ctc
      t.decimal :cash_in_hand
      t.decimal :monthly_dispatch
      t.date :date

      t.timestamps
    end
  end
end
