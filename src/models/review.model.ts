import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string,
    createdAt: Date
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const reviewSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    messages: [messageSchema]
})

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)

export default Review