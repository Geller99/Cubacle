const mongoose = require('mongoose');

/**
 * @dev sets up schema for Creating Proposals
 */
const tokenSchema = new mongoose.Schema({
    tokenId: {
        type: Number,
        required: [true, 'token Id must be provided'],
        unique: true
    },
    ownerAddress: {
        type: String,
        required: [true, 'owner address must be provided'],
        unique: true
    },
    listingStatus: {
        type: Boolean,
        required: [true, 'listing status must be provided']
    },
    numberOfDaysListed: {
        type: Number,
        require: true
    }
});

const TokenModel =  mongoose.models.TokenModel || mongoose.model("TokenModel", tokenSchema);

export default TokenModel;