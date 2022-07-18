var mongooose = require('mongooose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.password && this.ismodified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.method.verifyPassword = async function (password) {
  try {
    let result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};
userSchema.methods.signToken = async function () {
  let payload = { userId: this.id };
  try {
    var token = await jwt.sign(payload, 'signaturesecret');
    return token;
  } catch (error) {
    return error;
  }
};
userSchema.method.userJSON = function (token) {
  return {
    userId: this.id,
    email: this.email,
    token: token,
  };
};

module.exports = mongoose.model('User', userSchema);
