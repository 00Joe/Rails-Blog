class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  #used to force a user to log in before viewing/using the website
  # before_action :authenticate_user!
end
