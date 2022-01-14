class AddUserToSalarySetting < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :salary_setting, index: true
  end
end
