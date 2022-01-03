class Reply < ApplicationRecord
    belongs_to :leave_request

    validates_presence_of :reason
end
