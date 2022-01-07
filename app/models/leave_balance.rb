class LeaveBalance < ApplicationRecord
  belongs_to :user

  validates :fiscal_year, presence: true, uniqueness: { scope: :user }
end
