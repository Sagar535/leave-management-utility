class AddStartDateToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :start_date, :date
  end
end
