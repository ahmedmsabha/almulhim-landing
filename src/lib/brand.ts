export const brand = {
  nameAr: "منصة الملهم الذكي التعليمية",
  shortNameAr: "الملهم",
  nameEn: "Al-Mulhim",
  tagline: "الفيزياء ببساطة وإتقان",
  description:
    "منصة تعليمية مبسّطة لطلاب التوجيهي في الفيزياء — تصفّح المنهج والدروس التجريبية بدون حساب، والاشتراك يفتح الوصول الكامل.",
  studentAppUrl:
    process.env.NEXT_PUBLIC_STUDENT_APP_URL ?? "https://smartalmulhim.com",
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3000",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
} as const;
