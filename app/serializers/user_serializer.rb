class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :role, :first_name, :last_name, :join_date, :leave_request_days_count, :sick_leave_balance
end
