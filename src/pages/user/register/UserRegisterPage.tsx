// // src/pages/UserRegisterPage.tsx
// import { useState, useMemo, useRef, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { Search, ChevronDown, X, Check, Loader2, ShieldCheck } from "lucide-react";
// import { useUserStore } from "../../store/userStore";

// /** ===== Types ===== */
// interface FormData {
//   govOrganization: string;
//   cabinet: string;
//   region: string;
//   district: string;
// }

// /** ===== Demo data (замени на API) ===== */
// const GOV_ORGS = [
//   "Министерство цифрового развития",
//   "Министерство образования",
//   "Министерство здравоохранения",
//   "Министерство финансов",
//   "Агентство по делам государственной службы",
//   "Министерство цифрового развития",
//   "Министерство образования",
//   "Министерство здравоохранения",
//   "Министерство финансов",
//   "Агентство по делам государственной службы",
//   "Министерство цифрового развития",
//   "Министерство образования",
//   "Министерство здравоохранения",
//   "Министерство финансов",
//   "Агентство по делам государственной службы",
// ];

// const REGIONS = [
//   "Астана",
//   "Алматы",
//   "Шымкент",
//   "Акмолинская область",
//   "Актюбинская область",
//   "Астана",
//   "Астана",
//   "Алматы",
//   "Шымкент",
//   "Акмолинская область",
//   "Актюбинская область",
//   "Алматы",
//   "Шымкент",
//   "Акмолинская область",
//   "Актюбинская область",
// ];

// const DISTRICTS: Record<string, string[]> = {
//   "Астана": ["Есиль", "Алматы", "Сарыарка", "Байконур"],
//   "Алматы": ["Алмалинский", "Ауэзовский", "Бостандыкский", "Медеуский"],
//   "Шымкент": ["Абайский", "Аль-Фарабийский", "Енбекшинский", "Каратауский"],
//   "Акмолинская область": ["Аршалынский", "Бурабайский", "Целиноградский"],
//   "Актюбинская область": ["Алгинский", "Мартукский", "Хромтауский"],
// };

// /** ===== Hook: click outside ===== */
// function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
//   const ref = useRef<T | null>(null);
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (!ref.current) return;
//       if (!ref.current.contains(e.target as Node)) onOutside();
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onOutside]);
//   return ref;
// }

// /** ===== Reusable ComboBox ===== */
// type ComboBoxProps = {
//   label: string;
//   placeholder: string;
//   value: string;
//   onChange: (v: string) => void;
//   onSelect: (v: string) => void;
//   items: string[];
//   error?: string;
//   disabled?: boolean;
//   showSearchIcon?: boolean;
//   required?: boolean;
//   listEmptyText?: string;
// };

// function ComboBox({
//   label,
//   placeholder,
//   value,
//   onChange,
//   onSelect,
//   items,
//   error,
//   disabled,
//   showSearchIcon = false,
//   required = false,
//   listEmptyText = "Ничего не найдено",
// }: ComboBoxProps) {
//   const [open, setOpen] = useState(false);
//   const [highlightIndex, setHighlightIndex] = useState<number>(-1);

//   const filtered = useMemo(() => {
//     const q = value.trim().toLowerCase();
//     if (!q) return items;
//     return items.filter((x) => x.toLowerCase().includes(q));
//   }, [items, value]);

//   const wrapperRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

//   useEffect(() => {
//     setHighlightIndex(filtered.length ? 0 : -1);
//   }, [value, filtered.length]);

//   const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
//     if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
//       setOpen(true);
//       return;
//     }
//     if (!open) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlightIndex((i) => (i + 1) % Math.max(filtered.length, 1));
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlightIndex((i) => (i <= 0 ? Math.max(filtered.length - 1, -1) : i - 1));
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (highlightIndex >= 0 && filtered[highlightIndex]) {
//         onSelect(filtered[highlightIndex]);
//         setOpen(false);
//       }
//     } else if (e.key === "Escape") {
//       setOpen(false);
//     }
//   };

//   const borderClass = error ? "border-red-300" : "border-gray-200";
//   const ringClass = error ? "focus:ring-red-100" : "focus:ring-blue-100";
//   const disabledClass = disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white";

//   return (
//     <div className="mb-5" ref={wrapperRef}>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>

//       <div className="relative">
//         <input
//           type="text"
//           role="combobox"
//           aria-expanded={open}
//           aria-autocomplete="list"
//           aria-controls="combobox-listbox"
//           aria-invalid={!!error}
//           aria-describedby={error ? "combobox-error" : undefined}
//           value={value}
//           onChange={(e) => {
//             onChange(e.target.value);
//             setOpen(true);
//           }}
//           onFocus={() => setOpen(true)}
//           onKeyDown={onKeyDown}
//           disabled={disabled}
//           className={`w-full py-3 px-4 pr-10 border ${borderClass} rounded-xl ${ringClass} focus:outline-none transition-shadow ${disabledClass} placeholder:text-gray-400`}
//           placeholder={placeholder}
//         />

//         <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//           {value ? (
//             <button
//               type="button"
//               onClick={() => onChange("")}
//               aria-label="Очистить"
//               className="text-gray-400 hover:text-gray-500"
//             >
//               <X size={18} />
//             </button>
//           ) : showSearchIcon ? (
//             <Search size={18} className="text-gray-400" />
//           ) : (
//             <ChevronDown size={18} className="text-gray-400" />
//           )}
//         </div>

//         {open && !disabled && (
//           <div
//             id="combobox-listbox"
//             role="listbox"
//             className="absolute z-20 mt-2 w-full bg-white/95 backdrop-blur shadow-xl max-h-64 rounded-xl py-1 overflow-auto border border-gray-100"
//           >
//             {filtered.length === 0 ? (
//               <div className="px-4 py-3 text-sm text-gray-500">{listEmptyText}</div>
//             ) : (
//               filtered.map((item, idx) => {
//                 const active = idx === highlightIndex;
//                 const selected = item === value;
//                 return (
//                   <div
//                     key={`${item}-${idx}`}
//                     role="option"
//                     aria-selected={selected}
//                     className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${
//                       active ? "bg-gray-50" : "bg-white"
//                     }`}
//                     onMouseEnter={() => setHighlightIndex(idx)}
//                     onClick={() => {
//                       onSelect(item);
//                       setOpen(false);
//                     }}
//                   >
//                     <span className="truncate">{item}</span>
//                     {selected && <Check size={16} className="text-blue-600" />}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </div>

//       {error && (
//         <p id="combobox-error" className="mt-1 text-sm text-red-600">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// /** ===== Page ===== */
// const UserRegisterPage = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const selectedRole = useUserStore((s: any) => s.role) as "admin" | "user" | null; // роль выбрана на экране RoleSelection

//   const [formData, setFormData] = useState<FormData>({
//     govOrganization: "",
//     cabinet: "",
//     region: "",
//     district: "",
//   });

//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const availableDistricts = useMemo(() => DISTRICTS[formData.region] || [], [formData.region]);

//   /** ===== Validation ===== */
//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {};

//     if (!formData.govOrganization) {
//       newErrors.govOrganization = t("registration.errors.govOrganization.required", "Укажите наименование госоргана");
//     } else if (!GOV_ORGS.includes(formData.govOrganization)) {
//       newErrors.govOrganization = t("registration.errors.govOrganization.inList", "Выберите организацию из списка");
//     }

//     if (!formData.cabinet) {
//       newErrors.cabinet = t("registration.errors.cabinet.required", "Укажите номер кабинета");
//     } else if (!/^[\dA-Za-zА-Яа-я-]+$/.test(formData.cabinet.trim())) {
//       newErrors.cabinet = t("registration.errors.cabinet.format", "Разрешены цифры/буквы/дефис");
//     }

//     if (!formData.region) {
//       newErrors.region = t("registration.errors.region.required", "Выберите регион");
//     } else if (!REGIONS.includes(formData.region)) {
//       newErrors.region = t("registration.errors.region.inList", "Выберите регион из списка");
//     }

//     if (!formData.district) {
//       newErrors.district = t("registration.errors.district.required", "Выберите район");
//     } else if (!availableDistricts.includes(formData.district)) {
//       newErrors.district = t("registration.errors.district.inList", "Выберите район из списка");
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /** ===== Handlers ===== */
//   const setField = (field: keyof FormData, value: string) => {
//     setFormData((prev) => (field === "region" ? { ...prev, region: value, district: "" } : { ...prev, [field]: value }));
//     if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
//   };

//   /** ===== Submit ===== */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // если почему-то роль не выбрана (прямой заход/refresh) — отправим на выбор роли
//     if (!selectedRole) {
//       navigate("/");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // === тут будет реальный вызов API (POST /auth/register) ===
//       const payload = {
//         ...formData,
//         role: selectedRole, // отправляем роль
//       };
//       // await api.auth.register(payload) → tokens + me → сохранить в authStore

//       // демо-имитация запроса
//       await new Promise((r) => setTimeout(r, 800));

//       // после успешной регистрации всегда ведём пользователя в его главную
//       navigate("/user/home", { replace: true });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-24 px-4 pb-8">
//       <div className="text-center mt-3 mb-6">
//         <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3">
//           <ShieldCheck className="w-6 h-6" />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900">
//           {t("registration.title", "Регистрация пользователя")}
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           {t("registration.subtitle", "Заполните данные, чтобы продолжить")}
//         </p>
//       </div>

//       <div className="bg-white/90 backdrop-blur shadow-sm ring-1 ring-gray-100 rounded-2xl overflow-hidden">
//         <form onSubmit={handleSubmit} className="p-5">
//           {/* Госорган */}
//           <ComboBox
//             label={t("registration.govOrganization", "Наименование госоргана")}
//             placeholder={t("registration.selectOrganization", "Выберите организацию")}
//             value={formData.govOrganization}
//             onChange={(v) => setField("govOrganization", v)}
//             onSelect={(v) => setField("govOrganization", v)}
//             items={GOV_ORGS}
//             error={errors.govOrganization}
//             required
//             showSearchIcon
//             listEmptyText={t("common.empty", "Ничего не найдено")}
//           />

//           {/* Номер кабинета */}
//           <div className="mb-5">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {t("registration.cabinet", "Номер кабинета")} <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 inputMode="text"
//                 value={formData.cabinet}
//                 onChange={(e) => setField("cabinet", e.target.value)}
//                 className={`w-full py-3 px-4 border ${
//                   errors.cabinet ? "border-red-300" : "border-gray-200"
//                 } rounded-xl focus:outline-none focus:ring-2 ${
//                   errors.cabinet ? "focus:ring-red-100" : "focus:ring-blue-100"
//                 } placeholder:text-gray-400`}
//                 placeholder={t("registration.enterCabinet", "Введите номер кабинета")}
//                 aria-invalid={!!errors.cabinet}
//                 aria-describedby={errors.cabinet ? "cabinet-error" : undefined}
//               />
//               {formData.cabinet && (
//                 <button
//                   type="button"
//                   onClick={() => setField("cabinet", "")}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
//                   aria-label={t("common.clear", "Очистить")}
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//             </div>
//             {errors.cabinet && (
//               <p id="cabinet-error" className="mt-1 text-sm text-red-600">
//                 {errors.cabinet}
//               </p>
//             )}
//           </div>

//           {/* Регион */}
//           <ComboBox
//             label={t("registration.region", "Регион")}
//             placeholder={t("registration.selectRegion", "Выберите регион")}
//             value={formData.region}
//             onChange={(v) => setField("region", v)}
//             onSelect={(v) => setField("region", v)}
//             items={REGIONS}
//             error={errors.region}
//             required
//             listEmptyText={t("common.empty", "Ничего не найдено")}
//           />

//           {/* Район */}
//           <ComboBox
//             label={t("registration.district", "Район")}
//             placeholder={
//               formData.region
//                 ? t("registration.selectDistrict", "Выберите район")
//                 : t("registration.selectRegionFirst", "Сначала выберите регион")
//             }
//             value={formData.district}
//             onChange={(v) => setField("district", v)}
//             onSelect={(v) => setField("district", v)}
//             items={availableDistricts}
//             error={errors.district}
//             disabled={!formData.region}
//             required
//             listEmptyText={t("common.empty", "Ничего не найдено")}
//           />

//           {/* CTA */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-white font-semibold tracking-[0.01em] shadow-sm transition-all ${
//               isSubmitting
//                 ? "bg-blue-500/70 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99]"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 {t("registration.submitting", "Отправка...")}
//               </>
//             ) : (
//               <>
//                 <ShieldCheck className="h-5 w-5" />
//                 {t("registration.submit", "Подтвердить регистрацию")}
//               </>
//             )}
//           </button>

//           <p className="mt-3 text-center text-xs text-gray-500">
//             {t(
//               "registration.hint",
//               "Нажимая кнопку, вы подтверждаете корректность введённых данных"
//             )}
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserRegisterPage;

// src/pages/user/UserRegisterPage.tsx
import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, X, Check, Loader2, ShieldCheck } from "lucide-react";

/** ===== Types ===== */
interface FormData {
  govOrganization: string;
  cabinet: string;
  region: string;
  district: string;
}

/** ===== Demo data (замени на API) ===== */
const GOV_ORGS = [
  "Министерство цифрового развития",
  "Министерство образования",
  "Министерство здравоохранения",
  "Министерство финансов",
  "Агентство по делам государственной службы",
];

const REGIONS = ["Астана", "Алматы", "Шымкент", "Акмолинская область", "Актюбинская область"];

const DISTRICTS: Record<string, string[]> = {
  Астана: ["Есиль", "Алматы", "Сарыарка", "Байконур"],
  Алматы: ["Алмалинский", "Ауэзовский", "Бостандыкский", "Медеуский"],
  Шымкент: ["Абайский", "Аль-Фарабийский", "Енбекшинский", "Каратауский"],
  "Акмолинская область": ["Аршалынский", "Бурабайский", "Целиноградский"],
  "Актюбинская область": ["Алгинский", "Мартукский", "Хромтауский"],
};

/** ===== Hook: click outside ===== */
function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside]);
  return ref;
}

/** ===== Reusable ComboBox ===== */
type ComboBoxProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onSelect: (v: string) => void;
  items: string[];
  error?: string;
  disabled?: boolean;
  showSearchIcon?: boolean;
  required?: boolean;
  listEmptyText?: string;
};

function ComboBox({
  label,
  placeholder,
  value,
  onChange,
  onSelect,
  items,
  error,
  disabled,
  showSearchIcon = false,
  required = false,
  listEmptyText = "Ничего не найдено",
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return items;
    return items.filter((x) => x.toLowerCase().includes(q));
  }, [items, value]);

  const wrapperRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  useEffect(() => {
    setHighlightIndex(filtered.length ? 0 : -1);
  }, [value, filtered.length]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i <= 0 ? Math.max(filtered.length - 1, -1) : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && filtered[highlightIndex]) {
        onSelect(filtered[highlightIndex]);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const borderClass = error ? "border-red-300" : "border-gray-200";
  const ringClass = error ? "focus:ring-red-100" : "focus:ring-blue-100";
  const disabledClass = disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white";

  return (
    <div className="mb-5" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="combobox-listbox"
          aria-invalid={!!error}
          aria-describedby={error ? "combobox-error" : undefined}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className={`w-full py-3 px-4 pr-10 border ${borderClass} rounded-xl ${ringClass} focus:outline-none transition-shadow ${disabledClass} placeholder:text-gray-400`}
          placeholder={placeholder}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Очистить"
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={18} />
            </button>
          ) : showSearchIcon ? (
            <Search size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </div>

        {open && !disabled && (
          <div
            id="combobox-listbox"
            role="listbox"
            className="absolute z-20 mt-2 w-full bg-white/95 backdrop-blur shadow-xl max-h-64 rounded-xl py-1 overflow-auto border border-gray-100"
          >
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">{listEmptyText}</div>
            ) : (
              filtered.map((item, idx) => {
                const active = idx === highlightIndex;
                const selected = item === value;
                return (
                  <div
                    key={`${item}-${idx}`}
                    role="option"
                    aria-selected={selected}
                    className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${
                      active ? "bg-gray-50" : "bg-white"
                    }`}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onClick={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                  >
                    <span className="truncate">{item}</span>
                    {selected && <Check size={16} className="text-blue-600" />}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {error && (
        <p id="combobox-error" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const UserRegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    govOrganization: "",
    cabinet: "",
    region: "",
    district: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDistricts = useMemo(() => DISTRICTS[formData.region] || [], [formData.region]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.govOrganization) {
      newErrors.govOrganization = t("registration.errors.govOrganization.required", "Укажите наименование госоргана");
    } else if (!GOV_ORGS.includes(formData.govOrganization)) {
      newErrors.govOrganization = t("registration.errors.govOrganization.inList", "Выберите организацию из списка");
    }

    if (!formData.cabinet) {
      newErrors.cabinet = t("registration.errors.cabinet.required", "Укажите номер кабинета");
    } else if (!/^[\dA-Za-zА-Яа-я-]+$/.test(formData.cabinet.trim())) {
      newErrors.cabinet = t("registration.errors.cabinet.format", "Разрешены цифры/буквы/дефис");
    }

    if (!formData.region) {
      newErrors.region = t("registration.errors.region.required", "Выберите регион");
    } else if (!REGIONS.includes(formData.region)) {
      newErrors.region = t("registration.errors.region.inList", "Выберите регион из списка");
    }

    if (!formData.district) {
      newErrors.district = t("registration.errors.district.required", "Выберите район");
    } else if (!availableDistricts.includes(formData.district)) {
      newErrors.district = t("registration.errors.district.inList", "Выберите район из списка");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setField = (field: keyof FormData, value: string) => {
    setFormData((prev) => (field === "region" ? { ...prev, region: value, district: "" } : { ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600)); // имитация запроса
      navigate("/user/home", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-4 pb-8">
      <div className="text-center mt-3 mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t("registration.title", "Регистрация пользователя")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("registration.subtitle", "Заполните данные, чтобы продолжить")}
        </p>
        <p className="text-sm text-red-500 ">
          {t("registration.subtitle", "Регистер один раз туда-сюда")}
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur shadow-sm ring-1 ring-gray-100 rounded-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-5">
          <ComboBox
            label={t("registration.govOrganization", "Наименование госоргана")}
            placeholder={t("registration.selectOrganization", "Выберите организацию")}
            value={formData.govOrganization}
            onChange={(v) => setField("govOrganization", v)}
            onSelect={(v) => setField("govOrganization", v)}
            items={GOV_ORGS}
            error={errors.govOrganization}
            required
            showSearchIcon
            listEmptyText={t("common.empty", "Ничего не найдено")}
          />

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("registration.cabinet", "Номер кабинета")} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.cabinet}
                onChange={(e) => setField("cabinet", e.target.value)}
                className={`w-full py-3 px-4 border ${
                  errors.cabinet ? "border-red-300" : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 ${
                  errors.cabinet ? "focus:ring-red-100" : "focus:ring-blue-100"
                } placeholder:text-gray-400`}
                placeholder={t("registration.enterCabinet", "Введите номер кабинета")}
              />
              {formData.cabinet && (
                <button
                  type="button"
                  onClick={() => setField("cabinet", "")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  aria-label={t("common.clear", "Очистить")}
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {errors.cabinet && (
              <p className="mt-1 text-sm text-red-600">{errors.cabinet}</p>
            )}
          </div>

          <ComboBox
            label={t("registration.region", "Регион")}
            placeholder={t("registration.selectRegion", "Выберите регион")}
            value={formData.region}
            onChange={(v) => setField("region", v)}
            onSelect={(v) => setField("region", v)}
            items={REGIONS}
            error={errors.region}
            required
            listEmptyText={t("common.empty", "Ничего не найдено")}
          />

          <ComboBox
            label={t("registration.district", "Район")}
            placeholder={
              formData.region
                ? t("registration.selectDistrict", "Выберите район")
                : t("registration.selectRegionFirst", "Сначала выберите регион")
            }
            value={formData.district}
            onChange={(v) => setField("district", v)}
            onSelect={(v) => setField("district", v)}
            items={availableDistricts}
            error={errors.district}
            disabled={!formData.region}
            required
            listEmptyText={t("common.empty", "Ничего не найдено")}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-white font-semibold tracking-[0.01em] shadow-sm transition-all ${
              isSubmitting
                ? "bg-blue-500/70 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99]"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t("registration.submitting", "Отправка...")}
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" />
                {t("registration.submit", "Подтвердить регистрацию")}
              </>
            )}
          </button>

          <p className="mt-3 text-center text-xs text-gray-500">
            {t("registration.hint", "Нажимая кнопку, вы подтверждаете корректность введённых данных")}
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegisterPage;
