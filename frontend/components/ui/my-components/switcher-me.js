"use client"; // Ensure it's a client component
import { useTranslation } from "react-i18next";
import "../../../app/i18n"; // Import the i18n instance
import { Button } from "../button";

export default function SwitcherMe() {
  const { t, i18n } = useTranslation();

  const changeMyLanguage = (lang) => {
    console.log("Changing language to:", lang);
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lang);
    } else {
      console.error("i18n.changeLanguage is not defined.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => changeMyLanguage("am")}>Switch to Amharic</Button>
      <Button onClick={() => changeMyLanguage("en")}>Switch to English</Button>
    </div>
  );
}
