class AdminPolicy < ApplicationPolicy
  permit_conditional_access %i[index show create update destroy], if: :valid_user?

  def valid_user?
    user.admin?
  end
end
