namespace :db do
  desc "populates leave balance"
  task :populate_leave_balance, [:fy] => :environment do |_t, args|
    User.all.each do |user|
      leave_balance = user.leave_balances.find_or_initialize_by(fiscal_year: args[:fy]) do |leave_balance|
        # sick leave and paid leave could be negative as well
        # and will subsequently deducted from paid_leave and unpaid_leave
        leave_balance.sick_leave = [user.sick_leave_balance(args[:fy]), 0].max
        leave_balance.paid_leave = [user.paid_leave_balance(args[:fy]), 0].max
        leave_balance.unpaid_leave = user.unpaid_leave_balance(args[:fy])
      end

      if leave_balance.valid?
        leave_balance.save
      else
        p "Failed to populate leave balance for user #{user.id} #{user.first_name} #{user.last_name}"
        p "errors: #{leave_balance.errors.messages}"
      end
    rescue StandardError => e
      p e.message
    end
  end
end
