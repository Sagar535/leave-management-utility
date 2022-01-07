module Fiscal
  # start of next fiscal year
  def next_date(fy=nil)
    if fy.nil?
      today = Date.today
      # 7 implies july
      return Date.new(today.year, 7, 16) if today < Date.new(today.year, 7, 16)
      Date.new(today.year + 1, 7, 16)
    else
      nepali_year = fy.split("/").last.to_i
      english_year = nepali_year - 56

      # TODO: hard coded 20 needs to be addressed somehow...
      Date.new("20#{english_year}".to_i, 7, 16)
    end
  end

  # start of a fiscal year
  def start_date(fy=nil)
    if fy.nil?
      today = Time.zone.today
      # 7 implies july
      return Date.new(today.year - 1, 7, 16) if today < Date.new(today.year, 7, 16)
      Date.new(today.year, 7, 16)
    else
      nepali_year = fy.split("/").first.to_i
      english_year = nepali_year - 56

      # TODO: hard coded 20 needs to be addressed somehow...
      Date.new("20#{english_year}".to_i, 7, 16)
    end
  end

  module_function :next_date, :start_date
end
