import ReviewModel from "@/models/review.model";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest)  {
    try {
        const reqBody = request.json();
        const {reviewMessage, reviewId} = await reqBody;

        const review = await ReviewModel.findOne({_id: reviewId});

        if(!review) {
            return NextResponse.json({error: "Review is not available."}, {status: 400})
        }

        const sendingReview = {content: reviewMessage, createdAt: new Date()};

        review.feedback.push(sendingReview);
        await review.save();

        return NextResponse.json({message: "Review Send.", success: true, review}, {status: 200}) 

    } catch (error) {
        return NextResponse.json({error: "Server error while sending Review"}, {status: 500})
    }
}
