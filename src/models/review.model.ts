import mongoose, {Schema, Document} from "mongoose";

export interface Feedback extends Document {
    content: string,
    createdAt: Date
}

const feedbackSchema: Schema<Feedback> = new Schema({
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    question: {
        type: String,
        required: [true, "Question is required."]
    },
    feedback: [feedbackSchema]
})

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)

export default Review