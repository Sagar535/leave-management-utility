class Reply < ApplicationRecord
  belongs_to :leave_request

  validates :reason, presence: true
end
