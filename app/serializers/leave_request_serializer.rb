class LeaveRequestSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :status, :start_date, :end_date, :leave_type
  belongs_to :user
  has_one :reply
end
