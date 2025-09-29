// src/components/LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const langs: Array<"ru" | "kz"> = ["ru", "kz"];

  return (
    <div className="flex gap-2 justify-center mt-4">
      {langs.map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={`px-3 py-1 rounded border ${
            i18n.language === lng ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
