// frontend/src/components/LanguageDropdown.jsx

import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const currentLang = localStorage.getItem("language") || "en";

  const changeLanguage = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <select
      value={currentLang}
      onChange={changeLanguage}
      className="bg-inherit"
    >
      <option value="en" className="bg-black">
        English
      </option>
      <option value="hi" className="bg-black">
        हिंदी
      </option>
      {/* Add more options for other languages */}
    </select>
  );
};

export default LanguageDropdown;
