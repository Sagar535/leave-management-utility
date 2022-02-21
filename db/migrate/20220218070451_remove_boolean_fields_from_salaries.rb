class RemoveBooleanFieldsFromSalaries < ActiveRecord::Migration[6.1]
  def change
    remove_column :salaries, :life_ensured, :boolean
    remove_column :salaries, :ssf_enrolled, :boolean
  end
end
