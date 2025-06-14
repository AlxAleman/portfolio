import { useTranslation } from "react-i18next";

export default function Experience() {
  const { t } = useTranslation();
  const items = t("experience_items", { returnObjects: true });

  return (
    <section
      className="min-h-screen flex flex-col justify-center backdrop-blur-lg bg-white/70 dark:bg-neutral-900/80 border border-white/40 dark:border-neutral-700 shadow-xl rounded-xl my-8 p-8 max-w-3xl mx-auto"
      id="experience"
    >
      <h2 className="text-3xl font-bold mb-4 text-vscodegreen">{t("experience_title")}</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx} className="mb-8">
            <div className="font-semibold text-xl">{item.role}</div>
            <div className="text-vscodemagenta">
              {item.company} <span className="text-sm text-vscodeyellow">{item.period}</span>
            </div>
            <div className="text-vstextsoft dark:text-gray-200">{item.desc}</div>
          </li>
        ))}
      </ul>
    </section>

  );
}
