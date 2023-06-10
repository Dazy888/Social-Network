import { PasswordDto } from "@/dto/settings/password.dto";
import { MailDto } from "@/dto/settings/mail.dto";
import { TextDto } from "@/dto/settings/text.dto";
import { PhotoDto } from "@/dto/settings/photo.dto";
import { SettingsService } from "@/settings/settings.service";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    changePass(data: PasswordDto): Promise<void>;
    sendMail(data: MailDto): Promise<void>;
    cancelActivation(userId: string): Promise<void>;
    activate(link: string, res: any): Promise<void>;
    setName(data: TextDto): Promise<string>;
    setLocation(data: TextDto): Promise<string>;
    setAvatar(data: PhotoDto, file: any): Promise<string>;
    setBanner(data: PhotoDto, file: any): Promise<string>;
}
