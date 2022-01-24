class TaxRuleItemsController < ApplicationController
  before_action -> { authorize_class(TaxRuleItem) }, only: %i[index]

  def index
    @tax_rule_items = TaxRuleItem.all
    render json: TaxRuleItemSerializer.new(@tax_rule_items).serialized_json
  end
end
