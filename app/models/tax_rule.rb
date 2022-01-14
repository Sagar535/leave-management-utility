class TaxRule < ApplicationRecord
  belongs_to :salary
  has_many :tax_rule_items, dependent: :destroy

  validates :from_date, presence: true

  def active_tax_rule_item
    tax_rule_items.order(:amount_to).first
  end
end
