import { SmsService } from './sms-service';
import TwilioSmsService from './twilio-sms-service';

const smsService: SmsService = new TwilioSmsService();

export { smsService };
