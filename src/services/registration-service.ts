import aituBridge from "@btsd/aitu-bridge";

interface RegistrationFormData {
  govOrganization: string;
  cabinet: string;
  region: string;
  district: string;
}

interface RegistrationResponse {
  success: boolean;
  message: string;
  user_id: string;
  access_token: string;
  expires_in: number;
}

interface AituMeData {
  id?: string;
  user_id?: string;
  aitu_id?: string;
  userId?: string;
  uid?: string;
  name?: string;
  first_name?: string;
  firstName?: string;
  lastname?: string;
  last_name?: string;
  lastName?: string;
  username?: string;
  nick?: string;
  avatar?: string;
  avatarThumb?: string;
  avatar_thumb?: string;
  sign: string;
  private_messaging_enabled?: boolean;
  notifications_allowed?: boolean;
}


class RegistrationService {
  private apiUrl = import.meta.env.VITE_API_URL;
  
  async registerUser(formData: any) {
    const response = await fetch(`${this.apiUrl}/api/users/register`, {
      method: "POST",
      body: JSON.stringify(formData)
    });
    
    return response.json();
  }
}

export const registrationService = new RegistrationService();