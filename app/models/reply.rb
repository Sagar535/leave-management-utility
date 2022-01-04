class Reply < ApplicationRecord
  belongs_to :leave_request

  validate :reason, presence: true
end
