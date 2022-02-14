module FiscalYear
  # start of next fiscal year
  def next_fiscal_year_start_date(fiscal_year = nil)
    if fiscal_year.nil?
      today = Time.zone.today
      # 7 implies july
      return Date.new(today.year, 7, 16) if today < Date.new(today.year, 7, 16)

      Date.new(today.year + 1, 7, 16)
    else
      get_english_date(fiscal_year)
    end
  end

  # start of a fiscal year
  def start_date(fiscal_year = nil)
    if fiscal_year.nil?
      today = Time.zone.today
      # 7 implies july
      return Date.new(today.year - 1, 7, 16) if today < Date.new(today.year, 7, 16)

      Date.new(today.year, 7, 16)
    else
      get_english_date(fiscal_year)
    end
  end

  module_function :next_fiscal_year_start_date, :start_date

  def self.get_english_date(fiscal_year)
    nepali_year = fiscal_year.split("/").first.to_i
    english_year = nepali_year - 56

    # TODO: hard coded 20 needs to be addressed somehow...
    Date.new("20#{english_year}".to_i, 7, 16)
  end
end
