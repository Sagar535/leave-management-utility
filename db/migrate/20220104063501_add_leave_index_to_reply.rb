class AddLeaveIndexToReply < ActiveRecord::Migration[6.1]
  def change
    add_index :replies, :leave_request_id
  end
end
