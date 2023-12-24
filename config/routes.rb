Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
  resources :home, only: %i[index]

  scope :webhooks, module: :webhooks do
    resources :onetap_login_googles, only: %i[create]
  end

  scope :sdk, module: :sdk do
    resources :chats, only: %i[show], param: :project_uuid
  end

  scope :campaigns, module: :campaigns, as: :campaign do
    resources :projects, only: %i[index new create edit update destroy], param: :uuid do
      resources :interfaces, only: %i[create], module: :projects
    end
    resources :upgrades, only: %i[index]
    resource :sessions, only: %i[destroy]
  end

  api_version module: 'api/v1', path: { value: 'api/v1' } do
    resources :chats, only: %i[create]
  end
end
