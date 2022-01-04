class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :role, :first_name, :last_name, :sick_leave_balance
end
