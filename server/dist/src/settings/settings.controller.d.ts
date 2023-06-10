import { SettingsService } from "./settings.service";
import { PasswordDto } from "./dto/password.dto";
import { MailDto } from "./dto/mail.dto";
import { TextDto } from "./dto/text.dto";
import { PhotoDto } from "./dto/photo.dto";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    changePass(data: PasswordDto, accessToken: string): Promise<string>;
    sendMail(data: MailDto, accessToken: string): Promise<void>;
    activate(link: string, res: any): Promise<void>;
    cancelActivation(id: string, accessToken: string): Promise<void>;
    setName(data: TextDto, accessToken: string): Promise<void>;
    setLocation(data: TextDto, accessToken: string): Promise<void>;
    setAvatar(data: PhotoDto, image: any, accessToken: string): Promise<void>;
    setBanner(data: PhotoDto, image: any, accessToken: string): Promise<void>;
}
