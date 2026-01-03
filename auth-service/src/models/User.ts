import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  // add other fields if any
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<IUser>('User', UserSchema);
