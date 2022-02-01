class TaxRule < ApplicationRecord
  belongs_to :salary_setting, optional: true

  validates :from_date, :name, presence: true
end
