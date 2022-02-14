class ImportService
  require 'csv'
  attr_reader :csv_text

  def initialize(csv_text)
    @csv_text = csv_text
  end

  def import_user
    csv = CSV.parse(csv_text, headers: true)
    imported_count = 0

    csv.each do |row|
      user_params = row.to_hash
      user = User.find_or_initialize_by(email: user_params["email"])

      next unless user.new_record?

      raise(ActiveRecord::RecordInvalid.new(user), error_message(user)) if user.invalid?

      user.save!
      imported_count += 1
    end

    imported_count
  end

  private

  def error_message(user)
    "#{user.errors.full_messages} for record with email #{user.email}"
  end
end
