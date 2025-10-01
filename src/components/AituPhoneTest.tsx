import { useEffect, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";

interface UserData {
  name: string;
  lastname?: string;
  sign: string;
  id: string;
  avatar?: string;
  avatarThumb?: string;
  private_messaging_enabled: boolean;
  notifications_allowed: boolean;
}

interface PhoneData {
  phone: string;
  sign: string;
}

const AituBridgeTest = () => {
  const [supported, setSupported] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [phone, setPhone] = useState<PhoneData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (aituBridge && aituBridge.isSupported()) {
          setSupported(true);

          const [userData, phoneData] = await Promise.all([
            aituBridge.getMe(),
            aituBridge.getPhone()
          ]);

          setUser(userData);
          setPhone(phoneData);
        } else {
          setSupported(false);
          setError("Aitu Bridge не поддерживается");
        }
      } catch (e: any) {
        setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const testGetMe = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await aituBridge.getMe();
      setUser(result);
    } catch (e: any) {
      setError(`getMe error: ${e.message || String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetPhone = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await aituBridge.getPhone();
      setPhone(result);
    } catch (e: any) {
      setError(`getPhone error: ${e.message || String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">Загрузка данных Aitu...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-2xl mb-4">Aitu Bridge Test</h2>
        
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="font-semibold">
            Поддержка: 
            <span className={supported ? "text-green-600" : "text-red-600"}>
              {" "}{supported ? "✓ Да" : "✗ Нет"}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700 font-semibold">Ошибка:</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">getMe() - Данные пользователя</h3>
              <button
                onClick={testGetMe}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Обновить
              </button>
            </div>
            
            {user ? (
              <div className="bg-gray-50 p-4 rounded space-y-2">
                <div className="flex items-center gap-4 mb-3">
                  {user.avatar && (
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-bold text-lg">
                      {user.name} {user.lastname}
                    </p>
                    <p className="text-sm text-gray-600">ID: {user.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Личные сообщения:</span>
                    <span className={user.private_messaging_enabled ? "text-green-600" : "text-red-600"}>
                      {" "}{user.private_messaging_enabled ? "Включены" : "Отключены"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Уведомления:</span>
                    <span className={user.notifications_allowed ? "text-green-600" : "text-red-600"}>
                      {" "}{user.notifications_allowed ? "Включены" : "Отключены"}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-white rounded">
                  <p className="text-xs text-gray-500 font-mono break-all">
                    Sign: {user.sign}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Данные не загружены</p>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">getPhone() - Номер телефона</h3>
              <button
                onClick={testGetPhone}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Обновить
              </button>
            </div>
            
            {phone ? (
              <div className="bg-gray-50 p-4 rounded space-y-2">
                <p className="text-xl font-bold">{phone.phone}</p>
                <div className="p-2 bg-white rounded">
                  <p className="text-xs text-gray-500 font-mono break-all">
                    Sign: {phone.sign}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Телефон не загружен</p>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold text-lg mb-3">JSON Response</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-auto max-h-96">
              <pre>{JSON.stringify({ user, phone }, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AituBridgeTest;