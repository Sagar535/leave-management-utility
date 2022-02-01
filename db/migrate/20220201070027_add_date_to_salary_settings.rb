class AddDateToSalarySettings < ActiveRecord::Migration[6.1]
  def change
    add_column :salary_settings, :from_date, :date
    add_column :salary_settings, :to_date, :date
  end
end
