namespace :db do
  desc "populates monthly salary records"
  task :populate_salary_records, [:date] => :environment do |_t, args|
    p args[:date]

    User.all.each do |user|
      if user.active_salary.blank?
        p "User #{user.id} #{user.first_name} #{user.last_name} does not have active salary... "
        next
      end
      # fields to populate in salary records from salary
      # { allowance, festival_bonus, life_insurance_deduction, :income_tax, :cash_in_hand, :monthly_dispatch }
      salary_record = SalaryRecord.find_or_initialize_by(user: user, date: args[:date])

      # User can have different salaries at different point
      # But we need user_salary record with start_date <= date to get the record else we will get NIL
      active_salary = user.active_salary(date)

      salary_record.attributes = active_salary.attributes.
        slice(
          'allowance',
          'festival_bonus',
          'life_insurance_deduction',
          'monthly_dispatch'
        )

      # fields to calculate based on active salary setting
      # { ssf_office, ssf_employee, :net_ctc, :cash_in_hand, :income_tax, :cash_in_hand }
      salary_setting = SalarySetting.active(date)
      basic_salary = active_salary.basic_salary

      ssf_office = basic_salary * salary_setting.ssf_office
      ssf_employee = basic_salary * salary_setting.ssf_employee

      # make sure to edit salary setting -> tax_rules for given salary
      income_tax = basic_salary * salary_setting.tax_rule(basic_salary).rate
      cash_in_hand = basic_salary.to_d + active_salary.allowance.to_d + ssf_office - ssf_employee - active_salary.income_tax.to_d + active_salary.festival_bonus.to_d
      net_ctc = (basic_salary.to_d + active_salary.allowance.to_d + ssf_office - ssf_employee + active_salary.income_tax.to_d + active_salary.festival_bonus.to_d)

      salary_record.attributes = {
        'ssf_employee': ssf_employee,
        'ssf_office': ssf_office,
        'income_tax': income_tax,
        'cash_in_hand': cash_in_hand,
        'net_ctc': net_ctc
      }

      salary_record.ssf_employee = ssf_employee
      salary_record.ssf_office = ssf_office

      salary_record.income_tax = income_tax
      salary_record.cash_in_hand = cash_in_hand
      salary_record.net_ctc = net_ctc

      if salary_record.save
        p "User #{user.first_name} #{user.last_name} salary records populated successfully..."
      else
        p salary_record.errors.full_messages
      end
    # need a case when user is terminated... might generate record for user who has been terminated
    end
  end
end
