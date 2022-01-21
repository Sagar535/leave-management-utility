class SalarySettingsController < ApplicationController
  before_action -> { authorize_class(SalarySetting) }, only: %i[index create]
  before_action :set_salary_setting, only: [:show, :update]
  skip_before_action :verify_authenticity_token

  def index
    @salary_settings = SalarySetting.all
    render json: SalariesSettingSerializer.new(@salary_settings).serialized_json
  end

  def show
    options = { include: %i[users tax_rules] }
    render json: SalariesSettingSerializer.new(@salary_setting, options).serialized_json
  end

  def create
    @salary_setting = SalarySetting.new(salary_setting_params)
    if @salary_setting.save
      render json: SalariesSettingSerializer.new(@salary_setting).serialized_json
    else
      redirect_back fallback_location: '/admin/salary_settings', status: :unprocessable_entity
    end
  end

  def update
    if @salary_setting.update(salary_setting_params)
      options = { include: %i[users tax_rules] }
      render json: SalariesSettingSerializer.new(@salary_setting, options), status: :ok
    else
      redirect_back fallback_location: "/admin/salary_setting/#{@salary_setting.id}", status: :unprocessable_entity
    end
  end

  private

  def set_salary_setting
    @salary_setting = SalarySetting.find(params[:id])
    authorize @salary_setting
  end

  # Only allow a list of trusted parameters through.
  def salary_setting_params
    params.require(:salary_setting).permit(:ssf_office, :ssf_employee, :life_insurance_max, :ssf_tax_exemption_rate, :ssf_tax_exemption_max, :user_ids => [], :tax_rule_ids => [])
  end
end
