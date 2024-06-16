import ReviewModel from "@/models/review.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const reqBody = request.json();
        const {reviewId} = await reqBody;

        const review = await ReviewModel.findOne({_id: reviewId});

        if(!review) {
            return NextResponse.json({
                error: "This particular review is not found.",
                success: false
            }, {status: 400})
        }

        return NextResponse.json({
            message: "Review Found.",
            success: true,
            review
        })

    } catch (error) {
        return NextResponse.json({error: "Server error while fetching Feedbacks"}, {status: 500})
    }
}