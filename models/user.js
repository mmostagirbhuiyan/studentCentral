const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    email: {
        type: String,
        lowercase: true,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ email: value })
                    .exec(function(err, user){
                        if(err){
                            throw err;
                        }
                        else if(user) {
                            if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                                return isValid(true);
                            }
                            return isValid(false);
                        }
                        else{
                            return isValid(true);
                        }

                    })
            },
            message:  'The email address is already taken!'
        },
    },

    password:{
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    dateOfBirth:{
        type: String,
        required: true
    },

    phoneNumber:{
        type: String,
        required: true
    },

})


userSchema.methods.comparePassword = function(candidatePassword) {
    if (candidatePassword === this.password){
        return true
    }
    else
        return false
};

module.exports = mongoose.model('user', userSchema)