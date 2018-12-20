const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const User = new Schema({
    _id: Schema.Types.ObjectId,

    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
    },
    age: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true,
        default: 'http://localhost:5000/api/uploads/avatar.jpg'
    },

    articles: [{
        type: Schema.Types.ObjectId, //Id articles which is related to this user
        ref: 'Article'
    }],

    refreshToken: {
        type: String,
        require: true
    },

    __v: {
        type: Number,
        select: false
    }
});

//Validation
User.path('email').validate((email) => {
    if(validator.isLength(email, { min: 6, max: 30 })) {
        if(validator.isEmail(email)) {
            return true;
        } else {
            throw new Error('Email is incorrect');
        }
    } else {
        throw new Error('Email entity too large or too small');
    }
});

User.path('name').validate((name) => {
    if(validator.isAscii(name)) {
        return validator.isLength(name, { min: 1, max: 30 }) ? true : false;
    } else {
        throw new Error('Name shold use only ASCII characters');
    }
}, {
    message: 'Name entity too large or too small'
});

User.path('age').validate((age) => {
    if(validator.isAscii(age)) {
        return validator.isLength(age, { min: 1, max: 2 }) ? true : false;
    } else {
        throw new Error('Age shold use only ASCII characters');
    }
}, {
    message: 'Age entity too large or too small'
});

User.path('city').validate((city) => {
    if(validator.isAscii(city)) {
        return validator.isLength(city, { min: 1, max: 30 }) ? true : false;
    } else {
        throw new Error('City shold use only ASCII characters');
    }
}, {
    message: 'City entity too large or too small'
});

//Password hashing
User.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

//Compare user and strored pass 
User.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, res) {
        if (err) cb(err);
        cb(null, res); //if success, add user._id to session
    });
};

module.exports = mongoose.model('User', User);