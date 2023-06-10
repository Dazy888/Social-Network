import { Model } from "mongoose";
import { UserDocument } from "@/schemas/user.schema";
export declare class SettingsService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    changePass(currentPass: string, newPass: string, userId: string): Promise<string>;
    sendMail(email: string, activationLink: string, userId: string): Promise<string>;
    cancelActivation(id: string): Promise<void>;
    activate(activationLink: string): Promise<string>;
    setPhoto(newPath: string, field: string, model: any, userId: string): Promise<string>;
    setName(name: string, userId: string): Promise<string>;
    setLocation(location: string, userId: string): Promise<string>;
    setAvatar(newPath: string, userId: string, currentPath: string): Promise<string>;
    setBanner(newPath: string, userId: string, currentPath: string): Promise<string>;
}
