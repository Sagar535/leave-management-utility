class TaxRulesController < ApplicationController
  before_action -> { authorize_class(TaxRule) }, only: %i[index create]
  before_action :set_tax_rule, only: [:update]
  skip_before_action :verify_authenticity_token

  def index
    @tax_rules = TaxRule.order(id: :asc)
    render json: TaxRuleSerializer.new(@tax_rules).serialized_json
  end

  def create
    @tax_rule = TaxRule.new(tax_rule_params)
    if @tax_rule.save
      render json: TaxRuleSerializer.new(@tax_rule).serialized_json, status: :created
    else
      redirect_back fallback_location: '/admin/tax_rules', status: :unprocessable_entity, error: @tax_rule.errors.full_messages
    end
  end

  def update
    if @tax_rule.update(tax_rule_params)
      render json: TaxRuleSerializer.new(@tax_rule).serialized_json, status: :ok
    else
      render json: @tax_rule.errors, status: :unprocessable_entity
    end
  end
  private

  def set_tax_rule
    @tax_rule = TaxRule.find(params[:id])
    authorize @tax_rule
  end

  # Only allow a list of trusted parameters through.
  def tax_rule_params
    params.require(:tax_rule).permit(:name, :from_date, :to_date, :salary_setting_id)
  end
end
