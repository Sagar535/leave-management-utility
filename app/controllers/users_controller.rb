class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> { authorize_class(User) }, only: %i[index new create create_users]
  before_action :set_user, only: %i[show edit update destroy]

  def index
    if current_user.admin?
      @users = User.all
      render json: UserSerializer.new(@users).serialized_json
    else
      render json: { error: 'You are not authorized to view this page' }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    render json: UserSerializer.new(@user).serialized_json
  end

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
    if File.extname(params[:userFile]) == ".csv"
      filename = params[:userFile].tempfile
      csv_text = File.read(filename)
      # csv_text = File.read(params[:userFile])
      begin
        imported_count = ImportService.new(csv_text).import_user
      rescue ActiveRecord::RecordInvalid => invalid
        locals ||= { path: '/admin/users', error: invalid.message }
      rescue StandardError => error
        locals ||= { path: '/admin/users', error: error }
      end
    else
      locals = { path: '/admin/users', error: 'Please import file with csv extension.' }
    end

    locals ||= { path: '/admin/users', success: (imported_count.positive? ? "Successfully imported #{imported_count} data." : 'All users already imported') }
    render 'home/app', locals: locals
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
