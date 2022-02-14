class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :role, :first_name, :last_name, :start_date,
             :leave_request_days_count, :sick_leave_balance, :paid_leave_balance, :unpaid_leave_balance
end
