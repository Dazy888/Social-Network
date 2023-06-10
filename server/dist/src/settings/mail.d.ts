declare class MailService {
    private transporter;
    constructor();
    sendActivationMail(to: any, link: any): Promise<void>;
}
declare const _default: MailService;
export default _default;
