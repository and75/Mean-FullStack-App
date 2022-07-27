const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/custumer.route');
const bookRoutes = require('./routes/book.route');
const driveRoutes = require('./routes/drive.route');
const bookmarkRoutes = require('./routes/bookmark.route');
const tagRoutes = require('./routes/tag.route');
const vocabularyRoutes = require('./routes/vocabulary.route');
const commentRoutes = require('./routes/comment.route');
const activityRoutes = require('./routes/activity.route');
const importRoutes = require('./routes/import.route')

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname, './../data/tmp/')
}));
const db = require('./db');
const PORT = 8080;

app.use('/api/custumer', userRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/drive', driveRoutes);
app.use('/api/bookmark', bookmarkRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/import', importRoutes);

app.use('/', express.static('public'));


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
});