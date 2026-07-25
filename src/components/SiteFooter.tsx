import Image from "next/image";
import { brand } from "@/lib/brand";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#preview", label: "الدروس التجريبية" },
  { href: "#catalog", label: "المنهج" },
  { href: "#plans", label: "الباقات" },
  { href: "#about", label: "عن المنصة" },
  { href: "#contact", label: "تواصل" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
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
              <p className="font-display text-lg font-bold">{brand.shortNameAr}</p>
              <p className="text-xs text-inverse-primary">{brand.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-inverse-on-surface/80">
            {brand.description}
          </p>
        </div>

        <div>
          <p className="text-label-md uppercase text-inverse-primary">روابط</p>
          <ul className="mt-3 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label-md uppercase text-inverse-primary">التطبيقات</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={brand.studentAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                تطبيق الطالب
              </a>
            </li>
            <li>
              <a
                href={brand.adminUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                لوحة الإدارة
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-inverse-on-surface/70 sm:px-6">
          © {new Date().getFullYear()} {brand.shortNameAr}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
