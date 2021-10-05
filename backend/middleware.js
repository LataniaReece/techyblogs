const Blog = require('./models/blog');

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