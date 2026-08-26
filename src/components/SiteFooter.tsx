import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { brand } from "@/lib/brand";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#preview", label: "الدروس التجريبية" },
  { href: "#plans", label: "الاشتراك في الدورة الخاصة" },
  { href: "#home-videos", label: "فيديوهات تعريفية" },
  { href: "#about", label: "آراء الطلبة بدورة الأونلاين" },
  { href: "#success", label: "نجاحاتنا" },
  { href: "#contact", label: "تواصل" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-inverse-on-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt={brand.shortNameAr}
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <p className="font-display text-lg font-bold text-white">
                {brand.shortNameAr}
              </p>
              <p className="text-xs text-gold">{brand.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            {brand.description}
          </p>
        </div>

        <div>
          <p className="text-label-md uppercase text-gold">روابط</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label-md uppercase text-gold">التطبيقات</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a
                href={brand.studentAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                تطبيق الطالب
              </a>
            </li>
            <li>
              <a
                href={brand.adminUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                لوحة الإدارة
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="bg-white/10" />
      <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/55 sm:px-6">
        © {new Date().getFullYear()} {brand.shortNameAr}. جميع الحقوق محفوظة.
      </p>
    </footer>
  );
}
