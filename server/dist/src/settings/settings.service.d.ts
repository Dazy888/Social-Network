/// <reference types="multer" />
import { Model } from "mongoose";
import { MailerService } from "@nestjs-modules/mailer";
import { UserDocument } from "../schemas/user.schema";
import { SetProfileSettingsProps } from "@/settings/models/settings.models";
export declare class SettingsService {
    private userModel;
    private readonly mailerService;
    constructor(userModel: Model<UserDocument>, mailerService: MailerService);
    changePass(currentPass: string, newPass: string, _id: string): Promise<void>;
    sendMail(email: string, activationLink: string, _id: string): Promise<void>;
    activate(activationLink: string): Promise<void>;
    cancelActivation(_id: string): Promise<void>;
    uploadFile(file: Express.Multer.File, name: string): Promise<string>;
    deleteFile(imagePath: string): Promise<void>;
    uploadImage(field: 'banner' | 'avatar', userName: string, image: Express.Multer.File, _id: string, lastImage: string): Promise<void>;
    setProfileSettings(_id: string, data: SetProfileSettingsProps, banner: Express.Multer.File, avatar: Express.Multer.File): Promise<{
        name: string;
        location: string;
        banner: string;
        avatar: string;
    }>;
}
