// frontend/src/components/LanguageDropdown.jsx

import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select onChange={changeLanguage}>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      {/* Add more options for other languages */}
    </select>
  );
};

export default LanguageDropdown;
