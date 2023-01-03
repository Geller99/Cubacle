
import mongoose from 'mongoose';

const connectMongo = async () => {
    mongoose.connect(
    "mongodb+srv://Cubicle:CubexNFT101@cubicle.k5luxlw.mongodb.net/Cubicle?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
};

export default connectMongo;