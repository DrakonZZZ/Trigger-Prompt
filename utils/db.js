import mongoose from 'mongoose';

let connection = false;

export const dbConnection = async () => {
  mongoose.set('strictQuery', true);

  if (connection) {
    console.log('Connected to database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'triggerPrompts',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = true;
    console.log('Connection established');
  } catch (error) {
    console.log(error);
  }
};
