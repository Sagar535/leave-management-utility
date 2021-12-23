class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :role, :first_name, :last_name, :leave_request_days_count
end
