class ReplySerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :reason
end