import { SettingsService } from "./settings.service";
import { ActivationProps, ChangePassProps } from "./models/settings.models";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    changePass(data: ChangePassProps, authorization: string): Promise<void>;
    sendMail(data: ActivationProps, authorization: string): Promise<void>;
    cancelActivation(id: string, authorization: string): Promise<void>;
    activate(link: string, res: any, req: any): Promise<void>;
}
