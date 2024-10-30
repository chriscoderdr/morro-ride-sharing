import twilio from 'twilio';
import { SmsService } from './sms-service';

class TwilioSmsService implements SmsService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
  }

  async sendSms(phoneNumber: string, message: string): Promise<void> {
    await this.client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phoneNumber,
    });
  }
}

export default TwilioSmsService;
