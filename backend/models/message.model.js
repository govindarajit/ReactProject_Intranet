/*
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const messageSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            unique: false
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            unique: false
        }
    },
    { timestamps: true }
)

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }
        this.password = hash
        next()
    })
})

userSchema.methods.checkPassword = function(password) {
    console.log('in check password')
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        /!*if(passwordHash !== password) {
            return false
        }
        return true*!/
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }
            resolve(same)
        })
    })
}
const User = mongoose.model('users', userSchema)
module.exports = User*/
