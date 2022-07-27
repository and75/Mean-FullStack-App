const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const customerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  istitution: {
    type: String,
    required: true
  },
  presentation: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false,
    default: 'avatar-default.png'
  },
  enable: {
    type: Boolean,
    required: false,
    default: true,
  },
  role: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: false
  },
  updated:{
    type: Date,
    required: false    
  }
});

customerSchema.pre("updateOne", async function (next) {
  let data = this.getUpdate();
  const salt = await bcrypt.genSalt(10)
  data.$set.password = await bcrypt.hash(data.$set.password, salt);
  next();
})

customerSchema.pre("updateOne", function (next) {
  let data = this.getUpdate();
  let username = data.$set.firstName + '.' + data.$set.lastName;
  username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/([^\w]+|\s+)/g, '');
  data.$set.username = username.toLowerCase();
  data.$set.presentation.replace(/(<([^>]+)>)/gi, "");
  next()
})

customerSchema.pre("save", function (next) {
  const user = this
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
});

customerSchema.pre("save", function (next) {
  const user = this
  if ((this.isModified("firstName") || this.isNew) && (this.isModified("lastName") || this.isNew)) {
    let username = user.firstName + '.' + user.lastName;
    username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/([^\w]+|\s+)/g, '');
    user.username = username.toLowerCase();
  }
  if (this.isModified("presentation") || this.isNew) {
    user.presentation.replace(/(<([^>]+)>)/gi, "");
  }
  next()
});

customerSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}

module.exports = mongoose.model('customer', customerSchema);