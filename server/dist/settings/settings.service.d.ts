import { Model } from "mongoose";
import { MailerService } from "@nestjs-modules/mailer";
import { UserDocument } from "../schemas/user.schema";
export declare class SettingsService {
    private userModel;
    private readonly mailerService;
    constructor(userModel: Model<UserDocument>, mailerService: MailerService);
    changePass(currentPass: string, newPass: string, _id: string): Promise<void>;
    sendMail(email: string, activationLink: string, _id: string): Promise<void>;
    activateEmail(activationLink: string): Promise<void>;
    cancelEmailActivation(_id: string): Promise<void>;
}
