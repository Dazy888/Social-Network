/// <reference types="multer" />
import { Model } from "mongoose";
import { MailerService } from "@nestjs-modules/mailer";
import { UserDocument } from "../schemas/user.schema";
export declare class SettingsService {
    private userModel;
    private readonly mailerService;
    constructor(userModel: Model<UserDocument>, mailerService: MailerService);
    changePass(currentPass: string, newPass: string, userId: string): Promise<string>;
    sendMail(email: string, activationLink: string, _id: string): Promise<void>;
    activate(activationLink: string): Promise<void>;
    cancelActivation(_id: string): Promise<void>;
    setPhoto(newPath: string, field: string, model: any, userId: string): Promise<string>;
    setName(name: string, _id: string): Promise<void>;
    setLocation(location: string, _id: string): Promise<void>;
    uploadFile(file: any): Promise<any>;
    uploadImage(image: Express.Multer.File, field: string, _id: string): Promise<void>;
}
