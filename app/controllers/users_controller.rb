class UsersController < ApplicationController
  require 'csv'
  skip_before_action :verify_authenticity_token
  before_action -> { authorize_class(User) }, only: %i[index new create create_users]
  before_action :set_user, only: %i[show edit update destroy]

  def index
    unless current_user.admin?
      render json: {error: 'You are not authorized to view this page'}
    else
      @users = User.all
      render json: UserSerializer.new(@users).serialized_json
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show; end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit; end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def create_users
    if File.extname(params[:userFile]) != ".csv"
      render 'home/app', locals: { path: '/admin/users', error: 'Please import file with csv extension.' }
    else
      csv_text = File.read(params[:userFile])
      csv = CSV.parse(csv_text, :headers => true)
      imported_count = 0
      csv.each do |row|
        user = User.find_by(email: row.to_hash["email"])
        unless user.present?
          User.create!(row.to_hash)
          imported_count += 1
        end
      end

      render 'home/app', locals: { path: '/admin/users', success: (imported_count > 0 ? "Successfully imported #{imported_count} data." : 'All users already imported') }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
    authorize(@user)
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:email, :password, :role)
  end
end
