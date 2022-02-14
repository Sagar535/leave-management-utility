class AddUniqueIndexToLeaveBalance < ActiveRecord::Migration[6.1]
  def change
    add_index :leave_balances, [:fiscal_year, :user_id], unique: true
  end
end
