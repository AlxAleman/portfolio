import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section
  className="min-h-screen flex flex-col justify-center backdrop-blur-lg bg-white/70 dark:bg-neutral-900/80 border border-white/40 dark:border-neutral-700 shadow-xl rounded-xl my-8 p-8 max-w-3xl mx-auto"
  id="about"
>
      <h2 className="text-3xl font-bold mb-4 text-vscodeblue">{t("about_title")}</h2>
      <p className="text-lg text-vstextsoft dark:text-gray-200">{t("about_text")}</p>
    </section>

  );
}
