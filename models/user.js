import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email Exists'],
    required: [true, 'Email Required'],
  },

  username: {
    type: String,
    unique: [true, 'Username Exists'],
    required: [true, 'Username Required'],
    match: [
      /^(?=.{5,30}$)(?![.])(?!.*[.]{2})[а-яА-Яa-zA-Z0-9.]+(?<![.])$/,
      'Your Username is invalid, please make sure that it contains 5-30 characters and symbols.',
    ],
  },

  image: {
    type: String,
  },
});

const User = models.User || model('User', userSchema);

export default User;
