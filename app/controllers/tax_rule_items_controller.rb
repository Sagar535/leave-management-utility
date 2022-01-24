class TaxRuleItemsController < ApplicationController
  before_action -> { authorize_class(TaxRuleItem) }, only: %i[index create]

  def index
    @tax_rule_items = TaxRuleItem.all
    render json: TaxRuleItemSerializer.new(@tax_rule_items).serialized_json
  end

  def create
    @tax_rule_item = TaxRuleItem.new(tax_rule_params)
    if @tax_rule_item.save
      render json: TaxRuleItemSerializer.new(@tax_rule_item).serialized_json, status: :created
    else
      redirect_back fallback_location: '/admin/tax_rule_items', status: :unprocessable_entity, error: @tax_rule_item.errors.full_messages
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def tax_rule_params
    params.require(:tax_rule_item).permit(:amount_from, :amount_to, :rate)
  end
end
