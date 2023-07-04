import { Request, Response } from 'express';
import { SettingsService } from "./settings.service";
import { ActivateEmailDto, ChangePassDto } from "./dtos/settings.dtos";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    changePass(data: ChangePassDto, authorization: string): Promise<void>;
    sendMail(data: ActivateEmailDto, authorization: string): Promise<void>;
    cancelActivation(id: string, authorization: string): Promise<void>;
    activate(link: string, res: Response, req: Request): Promise<void>;
}
