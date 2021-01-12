class ImagesController < ApplicationController
  def index
  end

  def image_params
    params.require(:image).permit(:title, :file)
  end
end
