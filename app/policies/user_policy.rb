class UserPolicy < ApplicationPolicy
  permit_access_to_user_and_above :index, :create_users
  # permit_access :index
  permit_conditional_access %i[index show create update destroy], if: :valid_user?
  permit_conditional_access %i[show update], if: :own_record?

  def valid_user?
    user.admin?
  end

  def own_record?
    # admin owns all record
    return true if user.admin?

    # case for record itself is user, and record belongs to user
    [record.id, record[:user_id]].include?(user.id)
  end
end
