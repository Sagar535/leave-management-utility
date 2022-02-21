class CreateUserSalaries < ActiveRecord::Migration[6.1]
  def change
    create_table :user_salaries do |t|
      t.belongs_to :user
      t.belongs_to :salary
      t.date :start_date

      t.timestamps
    end
  end
end
