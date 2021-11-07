const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const opts = { 
    toJSON: { virtuals: true},
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
};

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: ImageSchema,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, opts);

blogSchema.virtual('relativeTime').get(function(){ 
    if(new Date(this.updated_at).getTime() > new Date(this.created_at).getTime()){
        return `Last updated ${moment(this.updated_at).fromNow()}`
    } else{
        return `Posted ${moment(this.created_at).fromNow()}`
    }
});

module.exports = mongoose.model('Blog', blogSchema)
