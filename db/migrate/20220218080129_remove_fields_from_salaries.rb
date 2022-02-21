class RemoveFieldsFromSalaries < ActiveRecord::Migration[6.1]
  def change
    # we will implement has_many through with user_salaries
    remove_column :salaries, :user_id, :bigint

    # we will determine following with the help of start_date of user_salary
    remove_column :salaries, :from_date, :date
    remove_column :salaries, :to_date, :date

    # we need active no more, we can determine that with the help of start_date in user_salary
    remove_column :salaries, :active, :boolean
  end
end
