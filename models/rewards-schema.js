const mongoose = require('mongoose');

/**
 * @dev sets up schema for Creating Proposals
 */
const rewardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title must be provided'],
        unique: true
    },
    detail: {
        type: String,
        required: [true, 'detail must be provided'],
        unique: true
    },
    image: {
        type: String,
        require: false
    },
    eligibilityCount: {
        type: Number,
        require: true
    }
});

const RewardModel =  mongoose.models.RewardModel || mongoose.model("RewardModel", rewardSchema);

export default RewardModel;