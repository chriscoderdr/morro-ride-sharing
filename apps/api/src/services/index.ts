import QueueService from './queue-service';
import { SmsService } from './sms-service';
import TwilioSmsService from './twilio-sms-service';

const smsService: SmsService = new TwilioSmsService();
const queueService: QueueService = new QueueService();

export { queueService, smsService };

