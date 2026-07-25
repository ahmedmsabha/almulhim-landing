import {
  Books,
  ClipboardText,
  Question,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

const stats = [
  { icon: Books, value: "+120", label: "درس شامل" },
  { icon: Question, value: "+2000", label: "سؤال تدريبي" },
  { icon: ClipboardText, value: "+50", label: "اختبار تراكمي" },
  { icon: UsersThree, value: "+10K", label: "طالب استفاد" },
] as const;

export function Stats() {
  return (
    <section className="border-b border-border bg-surface-container-lowest">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-container text-primary">
              <Icon size={24} weight="duotone" />
            </span>
            <div>
              <p className="font-display text-xl font-bold text-primary">
                {value}
              </p>
              <p className="text-sm text-on-surface-variant">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
