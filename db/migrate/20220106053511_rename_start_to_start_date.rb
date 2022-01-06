class RenameStartToStartDate < ActiveRecord::Migration[6.1]
  def change
    rename_column :leave_requests, :start, :start_date
  end
end
