class LeaveRequest < ApplicationRecord
  belongs_to :user
  belongs_to :approver, class_name: 'User', optional: true, inverse_of: :approved_leave_requests
  has_one :reply, dependent: :destroy
  enum status: { pending: 0, approved: 1, rejected: 2 }
  enum leave_type: { sick_leave: 0, personal: 1, others: 2 }

  validates :title, :start_date, :end_date, :leave_type, presence: true
  # validate same user can't create leave for same day with multiple reasons
  validate :prevent_multiple_leave_on_same_day
  validate :approver_exists, if: -> { status != 'pending' }

  accepts_nested_attributes_for :reply

  scope :upcoming_leaves, -> { where('start_date > ?', Time.zone.today) }

  def duration
    (end_date - start).to_i + 1
  end

  private

  def prevent_multiple_leave_on_same_day
    user.upcoming_leaves.where.not(id: id).find_each do |leave|
      return self.errors.add :message, "Leave already exists for given day/s" if overlaps?(leave)
    end
  end

  def approver_exists
    self.errors.add :approver, 'Approver must be present' if approver.blank?
  end

  # Check if a given interval overlaps this interval
  def overlaps?(other)
    start_date <= other.end_date && other.start_date <= self.end_date
  end
end
