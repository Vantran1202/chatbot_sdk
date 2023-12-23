Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"
  resources :home, only: %i[index]

  scope :sdk, module: :sdk do
    resources :chats, only: %i[show], param: :project_uuid
  end

  scope :campaigns, module: :campaigns, as: :campaign do
    resources :projects, only: %i[index new create edit update destroy], param: :uuid do
      resources :interfaces, only: %i[create], module: :projects
    end
    resources :upgrades, only: %i[index]
  end

  api_version module: 'api/v1', path: { value: 'api/v1' } do
    resources :chats, only: %i[create]
  end
end
