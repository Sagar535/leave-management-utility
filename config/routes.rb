Rails.application.routes.draw do
  devise_for :users, skip: [:registrations], controllers: {
    sessions: 'users/sessions'
  }
  resources :leave_requests
  resources :users
  root "home#app"
  get "*path" => redirect("/")
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
