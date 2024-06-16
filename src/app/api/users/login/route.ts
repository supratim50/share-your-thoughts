import UserModel from "@/models/user.model";
import { dbConnect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setToken } from "@/utils/setToken";
dbConnect();
export async function POST(request: NextRequest) {
    try {
        const reqData = request.json();
        const {usernameOrEmail, password} = await reqData;

        const user = await UserModel.findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]});

        if(!user) {
            return NextResponse.json({error: "User doesn't exist, please signup."}, {status: 400})
        }

        const isCorrectPassword = await bcryptjs.compare(password, user.password);

        if(!isCorrectPassword) {
            return NextResponse.json({error: "Plese check your username and password."}, {status: 400})
        }
        
        const token:any = setToken(user);
        const response = NextResponse.json({
            message: "User has logged in successfully.",
            success: true,
        });

        response.cookies.set("token", token, {httpOnly: true});

        return response;

    } catch (error) {
        return NextResponse.json({error: "server couldn't connect"}, {status: 500})
    }
}