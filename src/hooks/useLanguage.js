import { ar, en } from "languages";
import { useSelector } from "react-redux";

export default function useLanguage() {
  const language = useSelector((state) => state.app.language);

  return language === "ar" ? ar : en;
}
