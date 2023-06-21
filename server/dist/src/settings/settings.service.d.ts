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
    uploadFile(file: any, name: string): Promise<string>;
    deleteFiles(files: string[]): Promise<void>;
    uploadImage(field: 'banner' | 'avatar', userName: string, image: File, _id: string): Promise<void>;
    setProfileSettings(_id: string, data: SetProfileSettingsProps, banner: File, avatar: File): Promise<{
        name: string;
        location: string;
        banner: string;
        avatar: string;
    }>;
}
