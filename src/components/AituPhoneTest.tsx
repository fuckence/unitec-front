import { useEffect, useState } from "react";

declare const aituBridge: any; // чтобы TS не ругался

const AituPhoneTest = () => {
  const [supported, setSupported] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (aituBridge && aituBridge.isSupported()) {
        setSupported(true);
        aituBridge
          .getPhone()
          .then((result: string) => {
            setPhone(result);
          })
          .catch((err: any) => {
            console.error("Ошибка при вызове getPhone:", err);
            setError(String(err));
          });
      } else {
        setSupported(false);
      }
    } catch (e: any) {
      setSupported(false);
      setError(String(e));
    }
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
