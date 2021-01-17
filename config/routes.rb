Rails.application.routes.draw do
  devise_for :users
  get 'images/index'
  root 'images#index'
  resources :images
end
