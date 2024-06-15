import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    reviews: [String]
}

const userSchema: Schema<User> = new Schema({
    username:  {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email:  {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Passowrd is required"],
    },
    verifyCode: {
        type: String,
        // required: [true, "Verification Code is required."]
    },
    verifyCodeExpiry: {
        type: Date,
        // required: [true, "Verification Code is required."]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    reviews: []
})

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default User