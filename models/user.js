const { Schema, model } = require('mongoose');
const Joi = require('@hapi/joi');
const isemail = require('isemail');
const crypto = require('crypto');
const config = require('config');
const jwt = require('jsonwebtoken');


const userSchema = Schema({
  displayName: {
    type: String,
    required: [true, 'User name is required!'],
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    validate: {
      validator: function(email) {
        return isemail.validate(email);
      },
      message: 'Email is invalid'
    },
    required: [true, 'Email is invalid'],
    unique: 'Email already exists!'
  },
  hashedPassword: {
    type: String
  },
  salt: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailToken: {
    type: String,
    default: null
  }, 
  photo: {
    type: String
  },
  facebook: {
    id: {
      type: String,
      unique: 'Id already exists!'
    },
    profile: {}
  }
}, {
  timestamps: true,
})


// case for creating password

function generateHashedPassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2( password, salt, 
      config.get('crypto.iterations'), config.get('crypto.length'), 'sha512',
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex')); 
      })
  }); 
}



userSchema.methods.createPassword = async function(password) {
  if (!password) throw new Error('Password must be exists');
  this.salt = crypto.randomBytes(config.get('crypto.length')).toString('hex');
  this.hashedPassword = await generateHashedPassword(password, this.salt)
}

userSchema.methods.checkPassword = async function(password) {
  const hash = await generateHashedPassword(password, this.salt);
  return this.hashedPassword === hash;
}

userSchema.methods.generateVerificationToken = async function(emailVerification) {
    const payload = {
      _id: this._id,
      email: this.email
    }

    expiresIn = config.get('auth.expireEmail');

    this.emailToken = await jwt.sign(payload, config.get('auth.secretKey'), { expiresIn });
  }


userSchema.statics.payloadFields = ['displayName', 'email', 'password', 'photo'];


const payloadSchema = Joi.object({
  displayName: Joi.string()
      .min(3)
      .max(100)
      .required(),
  email: Joi.string()
    .min(5)
    .max(30)
    .custom((value) => {
      if (!isemail.validate(value)) throw new Error('Email is invalid');
      return value;
    }).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

  photo: Joi.string()
      .min(7)
      .max(2083)
      .empty('')
})




module.exports = {
  User: model('user', userSchema),
  userSchema: userSchema,
  payloadSchema: payloadSchema
}