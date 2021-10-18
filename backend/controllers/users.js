const generateToken = require('../utils/generateToken');
const { cloudinary } = require('../cloudinary');
const User = require('../models/user');
const Blog = require('../models/blog');
const passport = require('passport');


// @desc    Register User
// @route   POST /api/users/register
// @access  Public
module.exports.register = async (req, res, next) =>{
    try{
        const {email, username, password } = req.body;
        const user = new User({ email, username});
        const registeredUser = await User.register(user, password);
        registeredUser.image =  {
            url: 'https://res.cloudinary.com/ddxxsib3q/image/upload/v1632307014/webthoughts/wsryclnogebaubye3kej.jpg',
            filename: 'webthoughts/wsryclnogebaubye3kej'
        }
        registeredUser.save();
        req.login(registeredUser, err => {
            if(err) return res.status(404).json({ message: 'Error logging in user, please try again' })
            return res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id)
                })
        })
    }catch(error){
        return res.status(404).json({ message: error.message})
    }
};

// @desc    Login User
// @route   POST /api/users/login
// @access  Public
module.exports.login = async (req, res) =>{
    passport.authenticate('local', function(err, user, info) {
        if (!user) { return res.status(404).json({ message: 'Username or password incorrect. Please try again!' }) }
        if(err) { return res.status(404).json({ message: 'Username or password incorrect. Please try again!' }) }
        req.logIn(user, function(err) {
            if(err) { return res.status(404).json({ message: 'Username or password incorrect. Please try again!' }) }
          return res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
            })
        });
      })(req, res);
};

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Public
module.exports.logout = (req, res) =>{
    req.logout();
    res.json({ message: 'Goodbye!' });
};

// @desc    Get User Info
// @route   POST /api/users/:id
// @access  Public
module.exports.getUserById = async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        const userBlogs = await Blog.find({ author: user._id})
        res.json({user, userBlogs});
    }catch(error){
        return res.status(404).json({ message: error.message})
    }
};


// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private
module.exports.updateUser = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id, {...req.body.user}, { new: true });
        if(req.file){
            const img = {url: req.file.path, filename: req.file.filename};
            updatedUser.image = img;
            await updatedUser.save();
        }  
        req.login(updatedUser, err => {
            if(err) return next(err);
            res.json({message: 'Successfully updated profile!'});
        })
    }catch(error){
        return res.status(404).json({ message: error.message})
    }
};

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private
module.exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            await User.findByIdAndDelete(req.params.id)
            res.json({ message: 'User removed' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}