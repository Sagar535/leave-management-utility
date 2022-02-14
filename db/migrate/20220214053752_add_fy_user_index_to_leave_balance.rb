class AddFyUserIndexToLeaveBalance < ActiveRecord::Migration[6.1]
  def change
    add_index :leave_balances, [:user_id, :fiscal_year], unique: true
  end
end
