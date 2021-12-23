class UserPolicy < ApplicationPolicy
  permit_access_to_user_and_above :index, :create_users
  # permit_access :index
  permit_conditional_access %i[index show create update destroy], if: :valid_user?

  def valid_user?
    user.admin?
  end
end
