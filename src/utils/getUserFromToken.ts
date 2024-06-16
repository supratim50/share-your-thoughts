import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getUserFromToken(request:NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedUser:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedUser.username;
    } catch (error:any) {
        throw new Error(error.message);
    }
}