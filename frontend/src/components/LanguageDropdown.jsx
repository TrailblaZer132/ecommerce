import { useTranslation } from "react-i18next";
import { useState } from "react";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const currentLang = localStorage.getItem("language") || "en";
  const [isHovered, setIsHovered] = useState(false);

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    setIsHovered(false); // Close the dropdown after selection
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "be", name: "বাংলা" },
    { code: "as", name: "অসমীয়া" },
    { code: "kh", name: "Khasi" },
    // Add more languages here
  ];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        style={{
          backgroundColor: "inherit",
          border: "none",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        {languages.find((lang) => lang.code === currentLang)?.name ||
          "Language"}
      </button>
      {isHovered && (
        <div
          style={{
            display: "block",
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "white",
            zIndex: "10",
            color: "black",
          }}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: currentLang === lang.code ? "#ffe0e0" : "white",
              }}
            >
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
