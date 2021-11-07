const Blog = require('./models/blog');
const User = require('./models/user');
const { blogSchema, registerUserSchema, updateUserSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message: 'You must be logged in!' });
    }
    next();
};

module.exports.isAuthor = async(req, res, next) =>{
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(!blog.author.equals(req.user._id)){
        return res.status(401).json({ message: 'You do not have permission to do that!' });
    }
    next();
};

module.exports.isUserProfile = async(req, res, next) =>{
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            return res.status(404).json({ message: 'Cannot find user' });
        }else{
            if(foundUser._id.equals(req.user._id)) {
                next();
            }else{
                return res.status(401).json({ message: 'You do not have permission to do that!' });
            }
        
        }
    })
}

module.exports.validateBlog = (req, res, next) =>{      
    const {error} = blogSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        return res.status(400).json({ message: msg });
    }else{
        next();
    }
}
module.exports.validateNewUser = (req, res, next) =>{      
    const {error} = registerUserSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        return res.status(400).json({ message: msg });
    }else{
        next();
    }
}
module.exports.validateUpdatedUser = (req, res, next) =>{      
    const {error} = updateUserSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        return res.status(400).json({ message: msg });
    }else{
        next();
    }
}