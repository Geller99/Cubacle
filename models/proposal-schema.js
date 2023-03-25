const mongoose = require('mongoose');

/**
 * @dev sets up schema for Creating Proposals
 */
const proposalSchema = new mongoose.Schema({
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
    active: {
        type: Boolean,
        require: true
    },
    negativeVoteCount: {
        type: Number,
    },
    positiveVoteCount: {
        type: Number,
    },
    voters: {
        type: [String],
    },
    tokenIds: {
        type: [Number]   
    }

});

const ProposalModel =  mongoose.models.ProposalModel || mongoose.model("ProposalModel", proposalSchema);

export default ProposalModel;