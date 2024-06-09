import UserModel from "@/models/user.model";
import nodemailer from "nodemailer";

export async function sendMail({email, emailType, userId}:any) {
    try {
        const OTP = Math.floor(1000000+Math.random()*900000).toString();
        console.log("===============================", userId, OTP)
        const updateduser = await UserModel.findByIdAndUpdate(
            userId, 
            {verifyCode: OTP, 
            verifyCodeExpiry: Date.now() + 3600000}
        )

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "c1b645ac48c509",
            pass: "28f0bc7a027eb6"
            }
        });

        const mailOption = {
            from: 'supratimmondal05@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Verification Code | Share your Thoughts", // Subject line
            html: `<b>Hello User</b>,</br><p>Here is your OTP - <b>${OTP.toString()}</b> <p/>`, // html body
        }

        const mailRes = await transport.sendMail(mailOption);
        return mailRes;
    } catch (error:any) {
        throw new Error(error.message);
    }
}