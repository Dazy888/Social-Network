/// <reference types="multer" />
import { Model } from "mongoose";
import { MailerService } from "@nestjs-modules/mailer";
import { UserDocument } from "../schemas/user.schema";
export declare class SettingsService {
    private userModel;
    private readonly mailerService;
    constructor(userModel: Model<UserDocument>, mailerService: MailerService);
    changePass(currentPass: string, newPass: string, _id: string): Promise<void>;
    sendMail(email: string, activationLink: string, _id: string): Promise<void>;
    activate(activationLink: string): Promise<void>;
    cancelActivation(_id: string): Promise<void>;
    setName(name: string, _id: string): Promise<void>;
    setLocation(location: string, _id: string): Promise<void>;
    uploadFile(file: any, car?: string): Promise<any>;
    deleteFiles(files: string[]): Promise<void>;
    uploadImage(image: Express.Multer.File, field: 'avatar' | 'banner', _id: string): Promise<void>;
}
