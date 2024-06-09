import {dbConnect} from "@/dbConfig/dbConfig";
import UserModel from "@/models/user.model";
import { sendMail } from "@/utils/sendMail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        const user = await UserModel.findOne({$or: [{username}, {email}]});

        if(user) {
            return NextResponse.json({error: "User is already exist."}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await  newUser.save();
        console.log(savedUser);
        
        const mail = await sendMail({email, emailType:"VERIFY", userId: savedUser._id});
        console.log((mail));
        

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            user: savedUser
        })

    } catch (error) {
        console.log("Error occure while signup", error)
    }
}