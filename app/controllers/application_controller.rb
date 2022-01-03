class ApplicationController < ActionController::Base
  respond_to :html, :json
  before_action :authenticate_user!
  include Pundit
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!, unless: :devise_controller?
  after_action :verify_authorized, unless: :devise_controller?
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  protect_from_forgery unless: :token_authentication?

  private

  def authenticate_user_from_token
    return unless authenticate_token

    @token_authentication = true
    user = User.user.new
    sign_in user
  end

  def authenticate_token
    authenticate_with_http_token do |token, _options|
      token == ENV['AUTH_TOKEN']
    end
  end

  def truthy?(value)
    ActiveRecord::Type::Boolean.new.cast(value)
  end

  def user_not_authorized
    render json: { error: 'Unauthorized', message: "You are not authorized to perform this action." }, status: :forbidden
  end

  def authorize_class(klass)
    authorize klass
  end

  def token_authentication?
    @token_authentication
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update)
  end
end

