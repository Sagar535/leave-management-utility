class SalarySetting < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :salaries, dependent: :nullify
  has_many :tax_rules, dependent: :nullify

  accepts_nested_attributes_for :tax_rules

  validates :ssf_office, :ssf_employee, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 100 }
  validates  :life_insurance_max, :ssf_tax_exemption_rate, :ssf_tax_exemption_max, :from_date, presence: true
  validate :date_consistency

  before_update :prevent_update_unless_latest

  def latest?
    from_date.present? && from_date >= SalarySetting.pluck(:from_date).compact.max
  end

  private

  def date_consistency
    self.errors.add :date, 'from_date should be before to_date' if to_date.present? && from_date > to_date
  end

  def prevent_update_unless_latest
    raise ActiveRecord::RecordNotSaved.new, "Only latest active salary setting can be updated" unless latest?
  end
end
