class CreateLeaveBalances < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_balances do |t|
      t.references :user
      t.integer :sick_leave
      t.integer :paid_leave
      t.integer :unpaid_leave
      t.string :fiscal_year

      t.timestamps
    end
  end
end
