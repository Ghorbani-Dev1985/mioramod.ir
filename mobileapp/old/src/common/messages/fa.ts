export const fa = {
  common: {
    retry: 'تلاش مجدد',
    next: 'بعدی',
    back: 'قبلی',
    start: 'شروع',
    done: 'تمام شد',
    loading: 'در حال بارگذاری...',
  },
  splash: {
    title: 'بیمارستان فردا',
    subtitle: 'در حال اتصال به اینترنت...',
    noConnection: 'اتصال به اینترنت برقرار نیست',
    description:
      'برای استفاده از برنامه باید به اینترنت متصل باشید. لطفا اتصال خود را بررسی کنید.',
  },
  onboarding: {
    skip: 'رد کردن',
    done: 'ورود به برنامه',
  },
  errors: {
    general: 'خطایی رخ داد. لطفا دوباره تلاش کنید.',
  },
} as const;

export type Messages = typeof fa;
