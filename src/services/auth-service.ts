import aituBridge from "@btsd/aitu-bridge";

interface AuthResponse {
  access_token: string;
  expires_in: number;
}

interface UserCheckResponse {
  is_registered: boolean;
  user_id?: string;
  message: string;
}

class AuthService {
  private apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  async authenticate(): Promise<AuthResponse> {
    const [meData, phoneData] = await Promise.all([
      aituBridge.getMe(),
      aituBridge.getPhone()
    ]);

    const payload = {
      me: {
        data: meData,
        sign: meData.sign
      },
      phone: {
        data: { phone: phoneData.phone },
        sign: phoneData.sign
      }
    };

    const response = await fetch(`${this.apiUrl}/api/aitu/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Authentication failed");
    }

    const result: AuthResponse = await response.json();
    
    if (result.access_token) {
      localStorage.setItem("access_token", result.access_token);
    }

    return result;
  }

  async checkRegistrationStatus(): Promise<UserCheckResponse> {
    try {
      const meData = await aituBridge.getMe();
      const aituUserId = meData.id;

      if (!aituUserId) {
        throw new Error("Cannot determine user ID");
      }

      const response = await fetch(`${this.apiUrl}/api/users/${aituUserId}/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            is_registered: false,
            message: "User not found"
          };
        }
        throw new Error("Failed to check registration status");
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Failed to check registration status");
    }
  }

  getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  clearToken(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
  }
}

export const authService = new AuthService();