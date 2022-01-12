namespace :db do
  desc "populates leave balance"
  task :populate_leave_balance, [:fy] => :environment do |t, args|
    User.all.each do |user|
      begin
        leave_balance = user.leave_balances.find_or_initialize_by(
          sick_leave: [user.sick_leave_balance(args[:fy]), 0].max,
          paid_leave: [user.paid_leave_balance(args[:fy]), 0].max,
          unpaid_leave: user.unpaid_leave_balance(args[:fy]),
          fiscal_year: args[:fy]
        )

        if leave_balance.valid?
          leave_balance.save
        else
            p "Failed to populate leave balance for user #{user.id} #{user.first_name } #{user.last_name}"
            p "errors: #{leave_balance.errors.messages}"
        end
      rescue StandardError => e
        p e.message
      end
    end
  end
end
