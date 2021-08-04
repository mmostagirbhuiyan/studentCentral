const mongoose = require("mongoose")

const networkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ name: value })
                    .exec(function(err, network){
                        if(err){
                            throw err;
                        }
                        else if(network) {
                            if(self.id === network.id) {  // if finding and saving then it's valid even for existing email
                                return isValid(true);
                            }
                            return isValid(false);
                        }
                        else{
                            return isValid(true);
                        }

                    })
            },
            message:  'The group name is already taken!'
        },
    },

    course: {
        type: String,
        uppercase: true,
        required: true
    },

    semester: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    accessible: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true,
        // validate: {
        //     isAsync: true,
        //     validator: function(value, isValid) {
        //         const self = this;
        //         return self.constructor.findOne({ link: value })
        //             .exec(function(err, network){
        //                 if(err){
        //                     throw err;
        //                 }
        //                 else if(network) {
        //                     if(self.id === network.id) {  // if finding and saving then it's valid even for existing email
        //                         return isValid(true);
        //                     }
        //                     return isValid(false);
        //                 }
        //                 else{
        //                     return isValid(true);
        //                 }
        //             })
        //     },
        //     message:  `The link belongs to an existing network`
        // },
    }
})

module.exports = mongoose.model('Networks', networkSchema)