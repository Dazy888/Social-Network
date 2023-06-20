import { SettingsService } from "./settings.service";
import { PasswordDto } from "./dto/password.dto";
import { MailDto } from "./dto/mail.dto";
import { TextDto } from "./dto/text.dto";
import { PhotoDto } from "./dto/photo.dto";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    changePass(data: PasswordDto, authorization: string): Promise<void>;
    sendMail(data: MailDto, authorization: string): Promise<void>;
    cancelActivation(id: string, authorization: string): Promise<void>;
    activate(link: string, res: any, req: any): Promise<void>;
    setName(data: TextDto, authorization: string): Promise<void>;
    setLocation(data: TextDto, authorization: string): Promise<void>;
    setAvatar(data: PhotoDto, image: any, authorization: string): Promise<void>;
    setBanner(data: PhotoDto, image: any, authorization: string): Promise<void>;
}
