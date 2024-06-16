import UserModel from "@/models/user.model";
import ReviewModel from "@/models/review.model";
import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/getUserFromToken";
dbConnect();
export async function GET(request:NextRequest) {
    try {
        const username = getUserFromToken(request);
        
        const reviews = await ReviewModel.find({username});

        if(!reviews) {
            return NextResponse.json({error: "Reviews not found."}, {status:400});
        }

        return NextResponse.json({
            success: true,
            reviews 
        })
    } catch (error) {
        return NextResponse.json({error: "Server error while fetching Reviews"}, {status: 500})
    }
}