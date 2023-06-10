import { PasswordDto } from "@/settings/dto/password.dto";
import { MailDto } from "@/settings/dto/mail.dto";
import { TextDto } from "@/settings/dto/text.dto";
import { PhotoDto } from "@/settings/dto/photo.dto";
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
