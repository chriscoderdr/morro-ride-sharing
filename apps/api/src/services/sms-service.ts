export interface SmsService {
    sendSms(phoneNumber: string, message: string): Promise<void>;
  }
  