Rails.application.routes.draw do
  get 'images/index'
  root 'images#index'
  resources :images
end
