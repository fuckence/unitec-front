export interface GetMeResult {
  name: string;
  lastname?: string;
  sign: string;
  id: string;
  avatar?: string;
  avatarThumb?: string;
  private_messaging_enabled: boolean;
  notifications_allowed: boolean;
}

export interface PhoneResult {
  phone: string;
  sign: string;
}

export interface AituBridge {
  getMe(): Promise<GetMeResult>;
  getPhone(): Promise<PhoneResult>;
}

declare global {
  interface Window {
    aituBridge: AituBridge;
  }
}