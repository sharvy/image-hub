class ImagesController < ApplicationController
  def index
    @images = Image.all.includes(:file_attachment)
  end

  def new
  end

  def create
    images = params[:images]
    images.each do |key, value|
      if value[:file]
        img = Image.create(title: value[:title])
        img.file.attach(value[:file])
      end
    end

    render json: Image.count, status: :ok
  end
end
