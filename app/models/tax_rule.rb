class TaxRule < ApplicationRecord
  belongs_to :salary_setting, optional: true

  validates :amount_to, :amount_from, :rate, presence: true
  validate :amount_set_properly

  private

  def amount_set_properly
    self.errors.add :message, "Amount to must be greater than amount from..." if amount_from > amount_to
  end
end
