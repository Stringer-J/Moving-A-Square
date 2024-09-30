const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/square_db';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected!');
})
.catch(err => {
    console.err('Failed to connect MongoDB:', err);
});

module.exports = mongoose;