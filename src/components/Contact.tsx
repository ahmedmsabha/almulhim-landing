"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    <section id="contact" className="border-b border-border py-12 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-label-md uppercase text-primary">تواصل معنا</p>
          <h2 className="text-headline-md mt-2 text-foreground">
            لديك سؤال؟ راسلنا مباشرة
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            نسعد بمساعدتك في الاشتراك، الدروس التجريبية، أو أي استفسار عن المنصة.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {brand.whatsappUrl ? (
              <Button asChild variant="outline" size="lg">
                <a
                  href={brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  واتساب
                </a>
              </Button>
            ) : null}
            {brand.facebookUrl ? (
              <Button asChild variant="outline" size="lg">
                <a
                  href={brand.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  فيسبوك
                </a>
              </Button>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={(event) => void onSubmit(event)}
            className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">الاسم</Label>
                <Input
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">البريد</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="contact-phone">الهاتف (اختياري)</Label>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="contact-message">الرسالة</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                rows={5}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="mt-5 gap-2"
            >
              <PaperPlaneTilt size={18} weight="fill" />
              {status === "loading" ? "جارٍ الإرسال..." : "إرسال الرسالة"}
            </Button>

            {status === "success" ? (
              <p className="mt-3 text-sm text-status-active">
                تم إرسال رسالتك بنجاح. سنعود إليك قريبًا.
              </p>
            ) : null}
            {status === "error" && errorMessage ? (
              <p className="mt-3 text-sm text-destructive">{errorMessage}</p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
