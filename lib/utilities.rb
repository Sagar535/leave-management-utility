module Utilities
  def self.time_rand
    (10.years.ago.to_date...Time.zone.now.to_date).to_a.sample
  end
end
