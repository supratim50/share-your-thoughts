import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const reqData = request.json();
        const {email, otp} = await reqData;

        const user = await UserModel.findOne({email, verifyCodeExpiry: {$gt: Date.now()}});   

        if(!user) {
            return NextResponse.json({error: "Invalid OTP"}, {status: 400})
        }

        if(!(otp === user?.verifyCode)) {
            return NextResponse.json({error: "Invalid OTP"}, {status: 400})
        }

        user.isVerified = true;
        user.verifyCode = undefined!;
        user.verifyCodeExpiry = undefined!;

        await user.save();

        return NextResponse.json({
            message: "OTP is verified.",
            success: true
        })

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({error: "Server error while velidating OTP!"}, {status: 500});  
    }
}