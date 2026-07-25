"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { submitContact } from "@/lib/api";
import { brand } from "@/lib/brand";
import { captureLandingEvent } from "@/lib/posthog/capture";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    try {
      await submitContact({
        name,
        email,
        message,
        phone: phone || undefined,
      });
      captureLandingEvent("contact_submit", { success: true });
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      captureLandingEvent("contact_submit", { success: false });
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? "تعذّر إرسال الرسالة. حاول مرة أخرى بعد قليل."
          : "حدث خطأ غير متوقع.",
      );
    }
  }

  return (
    <section id="contact" className="border-b border-border bg-surface-container-low/40 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-label-md uppercase text-primary">تواصل معنا</p>
          <h2 className="text-headline-md mt-2 text-on-surface">
            لديك سؤال؟ راسلنا مباشرة
          </h2>
          <p className="mt-3 text-base leading-7 text-on-surface-variant">
            نسعد بمساعدتك في الاشتراك، الدروس التجريبية، أو أي استفسار عن المنصة.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {brand.whatsappUrl ? (
              <a
                href={brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface hover:border-primary hover:text-primary"
              >
                واتساب
              </a>
            ) : null}
            {brand.facebookUrl ? (
              <a
                href={brand.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface hover:border-primary hover:text-primary"
              >
                فيسبوك
              </a>
            ) : null}
          </div>
        </div>

        <form
          onSubmit={(event) => void onSubmit(event)}
          className="rounded-lg border border-border bg-surface-container-lowest p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-on-surface-variant">الاسم</span>
              <input
                name="name"
                required
                minLength={2}
                className="w-full rounded-md border border-border bg-white px-3 py-2 outline-none ring-primary focus:ring-2"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-on-surface-variant">البريد</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-border bg-white px-3 py-2 outline-none ring-primary focus:ring-2"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="mb-1.5 block text-on-surface-variant">
              الهاتف (اختياري)
            </span>
            <input
              name="phone"
              className="w-full rounded-md border border-border bg-white px-3 py-2 outline-none ring-primary focus:ring-2"
            />
          </label>
          <label className="mt-4 block text-sm">
            <span className="mb-1.5 block text-on-surface-variant">الرسالة</span>
            <textarea
              name="message"
              required
              minLength={10}
              rows={5}
              className="w-full resize-y rounded-md border border-border bg-white px-3 py-2 outline-none ring-primary focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container disabled:opacity-60"
          >
            <PaperPlaneTilt size={18} weight="fill" />
            {status === "loading" ? "جارٍ الإرسال..." : "إرسال الرسالة"}
          </button>

          {status === "success" ? (
            <p className="mt-3 text-sm text-status-active">
              تم إرسال رسالتك بنجاح. سنعود إليك قريبًا.
            </p>
          ) : null}
          {status === "error" && errorMessage ? (
            <p className="mt-3 text-sm text-error">{errorMessage}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
