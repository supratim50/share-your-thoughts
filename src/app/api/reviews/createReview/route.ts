import ReviewModel from "@/models/review.model";
import UserModel from "@/models/user.model";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json();
        const {username, question} = await reqBody;

        const user = await UserModel.findOne({username});

        if(!user) {
            return NextResponse.json({error: "User is not found."}, {status: 400})
        }

        if(!user?.isVerified) {
            return NextResponse.json({error: "User is not Verified. Please verify your account."}, {status: 400})
        }

        const newReview = new ReviewModel({
            username,
            question,
        })

        const review= await newReview.save();

        if(!review) {
            return NextResponse.json({error: "Error occure while creating new review."}, {status: 400});
        }

        return NextResponse.json({message: "Review got successfully created.", success: true, review}, {status: 200})

    } catch (error) {
        return NextResponse.json({error: "Server error while creating Review Section"}, {status: 500})
    }
}