const mongoose = require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema;

roomSchema = new Schema({
    // userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    roomId: String,
    usernames: [String],
    startTime: Date,
    endTime: Date,
    questionDifficulty: String,
    // list of questionId
    
});

Room = mongoose.model('Room', roomSchema)
module.exports = Room;