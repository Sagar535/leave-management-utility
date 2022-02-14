module Utilities
  def self.random_time
    (10.years.ago.to_date...Time.zone.now.to_date).to_a.sample
  end
end
