class SalarySettingsController < ApplicationController
  before_action -> { authorize_class(User) }, only: %i[index]
  skip_before_action :verify_authenticity_token

  def index
    @salary_settings = SalarySetting.all
    render json: SalariesSettingSerializer.new(@salary_settings).serialized_json
  end
end
