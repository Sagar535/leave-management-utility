class CreateSalaries < ActiveRecord::Migration[6.1]
  def change
    create_table :salaries do |t|
      t.belongs_to :users, index: true
      t.boolean :ssf_enrolled
      t.boolean :life_ensured
      t.decimal :basic_salary
      t.decimal :commitment_bonus
      t.date :from_date
      t.date :to_date
      t.boolean :active

      t.timestamps
    end
  end
end
