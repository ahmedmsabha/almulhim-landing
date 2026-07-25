import {
  Broadcast,
  ChatsCircle,
  ClockCountdown,
  DeviceMobile,
  FolderOpen,
  Question,
  VideoCamera,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: ChatsCircle,
    title: "مجموعات دعم مباشرة",
    description:
      "تواصل يومي مع المعلمين عبر واتساب وفيسبوك للإجابة السريعة على الاستفسارات.",
  },
  {
    icon: Question,
    title: "بنك أسئلة وتدريب مكثف",
    description:
      "نماذج وزارية وأسئلة سنوات سابقة لضمان جاهزيتك قبل الامتحان.",
  },
  {
    icon: FolderOpen,
    title: "ملخصات وملفات",
    description:
      "ملخصات ذكية تركز على الأفكار والقوانين والنقاط المتكررة في الامتحانات.",
  },
  {
    icon: VideoCamera,
    title: "حصص مسجّلة",
    description:
      "شرح مفصّل لكل موضوع في المنهاج الفلسطيني عبر شاشات تفاعلية.",
  },
  {
    icon: DeviceMobile,
    title: "تطبيق لكل الأجهزة",
    description:
      "دروس وأسئلة وملفات في مكان واحد على الجوال والحاسوب.",
  },
  {
    icon: ChartLineUp,
    title: "متابعة مستمرة",
    description:
      "محتوى يتحدّث حسب احتياجات الطلاب وتغيّرات المنهاج.",
  },
  {
    icon: Broadcast,
    title: "لقاءات مباشرة",
    description:
      "جلسات تفاعلية قبل الامتحانات لحل النماذج والإجابة على الأسئلة.",
  },
  {
    icon: ClockCountdown,
    title: "مراجعات مكثّفة",
    description:
      "جلسات مركّزة على أهم مادة الامتحان وتبسيط المفاهيم الصعبة.",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">لماذا الملهم</p>
          <h2 className="text-headline-md mt-2 text-on-surface">
            كل ما تحتاجه للفيزياء في مكان واحد
          </h2>
          <p className="mt-3 text-base leading-7 text-on-surface-variant">
            أدوات تعليمية واضحة، متابعة حقيقية، ومحتوى يبني ثقتك قبل الامتحان.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="group">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-fixed text-primary transition-transform group-hover:-translate-y-0.5">
                <Icon size={24} weight="duotone" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-on-surface">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
