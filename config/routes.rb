Rails.application.routes.draw do
  devise_for :users, skip: [:registrations], controllers: {
    sessions: 'users/sessions'
  }
  resources :leave_requests
  resources :users
  resources :salary_settings, only: %i[index show create update]
  resources :tax_rules, only: %i[index create update]
  root "home#app"
  match '*path', to: 'home#app', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
