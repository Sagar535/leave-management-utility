module Fiscal
  def next_date
    today = Date.today
    # 7 implies july
    return Date.new(today.year, 7, 16) if today < Date.new(today.year, 7, 16)
    Date.new(today.year + 1, 7, 16)
  end

  def start_date
    Date.new(Time.zone.today.year, 7, 16)
  end

  module_function :next_date, :start_date
end
