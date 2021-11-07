const mongoose = require('mongoose')
const Blog = require('./models/blog.js');

mongoose.connect('mongodb+srv://tania:ta123nia456@cluster0.nx2ig.mongodb.net/myBlog2021?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log('Database connected')
})

const seedDb = async () => {
    await Blog.deleteMany({});
    for (let i =0; i < 20; i++){
        const blog = new Blog({
            author: '6151f58e9030bd5d59f96e4f',
            title: 'Seeder Blog Post',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            image: {
                "url": "https://res.cloudinary.com/ddxxsib3q/image/upload/v1632515648/myblog2021/ty46lqzalcvfh8e0u5zi.jpg",
                "filename": "myblog2021/ty46lqzalcvfh8e0u5zi"
             }
        })
        await blog.save()
    }
}

seedDb().then(() =>{
    mongoose.connection.close()
})