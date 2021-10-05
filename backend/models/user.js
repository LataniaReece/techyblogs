const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Blog = require('./blog')

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: ImageSchema
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Blog.deleteMany({
            _id: {
                $in: doc.reviews   
            }
        })
    }
})

module.exports = mongoose.model('User', UserSchema);