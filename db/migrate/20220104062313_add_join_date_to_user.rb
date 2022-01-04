class AddJoinDateToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :join_date, :date
  end
end
