import { useEffect, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";

const AituPhoneTest = () => {
  const [supported, setSupported] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        if (aituBridge && aituBridge.isSupported()) {
          setSupported(true);

          const result = await aituBridge.getPhone();
        
          setPhone(result.phone);
        } else {
          setSupported(false);
        }
      } catch (e: any) {
        setError(String(e));
      }
    };

    fetchPhone();
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">Aitu Bridge Test</h2>
      <p>Поддержка: {supported ? "Да" : "Нет"}</p>
      {phone && <p>Телефон: {phone}</p>}
      {error && <p className="text-red-500">Ошибка: {error}</p>}
    </div>
  );
};

export default AituPhoneTest;
