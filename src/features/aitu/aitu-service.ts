import type { GetMeResult, PhoneResult } from './aitu-types';

class AituService {
  private bridge = window.aituBridge;

  async getUserInfo(): Promise<GetMeResult> {
    try {
      return await this.bridge.getMe();
    } catch (error) {
      console.error('Failed to get user info:', error);
      throw error;
    }
  }

  async getPhoneNumber(): Promise<PhoneResult> {
    try {
      return await this.bridge.getPhone();
    } catch (error) {
      console.error('Failed to get phone number:', error);
      throw error;
    }
  }

  async getUserData() {
    const [userInfo, phoneData] = await Promise.all([
      this.getUserInfo(),
      this.getPhoneNumber()
    ]);

    return {
      ...userInfo,
      phone: phoneData.phone,
      phoneSign: phoneData.sign
    };
  }
}

export const aituService = new AituService();