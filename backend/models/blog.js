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
    // const now = moment()
    // const result = moment(createdDate)
    // return `${now} ${result}`
    // const today = moment();
    // const days = today.diff(moment(this.createdAt), "days")
    // const hours = today.diff(moment(this.createdAt), "hours")
    // const mins = today.diff(moment(this.createdAt), "minutes")
    // const secs = today.diff(moment(this.createdAt), "seconds")

    // if(secs < 60 && mins === 0 && hours === 0 && days === 0){
    //     if(secs === 0){
    //         return `just now`
    //     }
    //     return `${secs} ${secs === 1 ? 'second' : 'seconds'} ago`
    // }else if (mins > 0 && secs >= 60 && hours === 0 && days === 0){
    //     return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`
    // }else if (hours > 0 && secs >= 60 && mins >= 60 && days === 0){
    //     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    // }else if (days > 0 && secs >= 60 && mins >= 60 && hours >= 24){
    //     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    // }
});

module.exports = mongoose.model('Blog', blogSchema)
