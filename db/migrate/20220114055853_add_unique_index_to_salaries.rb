class AddUniqueIndexToSalaries < ActiveRecord::Migration[6.1]
  def change
    add_index :salaries, [:user_id, :active], unique: true, where: 'active'
  end
end
