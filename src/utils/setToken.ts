import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";


export function setToken(user:User) {
    try {
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        return token;
    } catch (error) {
        
    }
}