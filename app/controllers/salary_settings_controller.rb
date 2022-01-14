class SalarySettingsController < ApplicationController
  before_action -> { authorize_class(User) }, only: %i[index]
  before_action :set_salary_setting, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    @salary_settings = SalarySetting.all
    render json: SalariesSettingSerializer.new(@salary_settings).serialized_json
  end

  def show
    render json: SalariesSettingSerializer.new(@salary_setting).serialized_json
  end

  private

  def set_salary_setting
    @salary_setting = SalarySetting.find(params[:id])
    authorize @salary_setting
  end
end
