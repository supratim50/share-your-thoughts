import ReviewModel from "@/models/review.model";
import UserModel from "@/models/user.model";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json();
        const {userId, question} = await reqBody;

        const user = await UserModel.findOne({_id: userId});

        if(!user) {
            return NextResponse.json({error: "User is not valid."}, {status: 400})
        }

        const newReview = new ReviewModel({
            userId: user._id,
            question,
        })

        const review= await newReview.save();

        if(!review) {
            return NextResponse.json({error: "Error occure while creating new review."}, {status: 400});
        }

        const reviewId = review._id;
        user.reviews.push(reviewId);
        await user.save();

        return NextResponse.json({message: "Review got successfully created.", success: true, review, user,}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: "Server error while creating Review Section"}, {status: 500})
    }
}