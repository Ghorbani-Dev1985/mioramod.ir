const { hairlineWidth } = require('nativewind/theme');
const plugin = require('tailwindcss/plugin'); // <--- این خط اضافه شد

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        peyda: 'peyda-regular',
        'peyda-thin': 'peyda-thin',
        'peyda-extralight': 'peyda-extralight',
        'peyda-light': 'peyda-light',
        'peyda-medium': 'peyda-medium',
        'peyda-semibold': 'peyda-semibold',
        'peyda-bold': 'peyda-bold',
        'peyda-extrabold': 'peyda-extrabold',
        'peyda-black': 'peyda-black',
      },
      colors: {
        // ═══════════════════════════════════════════
        // Semantic Colors
        // ═══════════════════════════════════════════
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // ═══════════════════════════════════════════
        // Palette Colors
        // ═══════════════════════════════════════════
        'primary-70': '#454545',
        'primary-80': '#262626',
        'primary-95': '#141414',
        'primary-100': '#000000',

        'neutral-5': '#ffffff',
        'neutral-10': '#fcfcfc',
        'neutral-15': '#f5f5f5',
        'neutral-20': '#f0f0f0',
        'neutral-30': '#d9d9d9',
        'neutral-40': '#bfbfbf',
        'neutral-50': '#8c8c8c',
        'neutral-60': '#595959',
        'neutral-70': '#454545',
        'neutral-80': '#262626',
        'neutral-90': '#1f1f1f',
        'neutral-95': '#141414',
        'neutral-100': '#000000',

        disabled: '#E3E3E5',

        'green-10': '#e6f7f1',
        'green-20': '#c8efe3',
        'green-30': '#96e0c8',
        'green-60': '#2eb88a',
        'green-70': '#259a74',
        'green-90': '#1a6e54',

        'yellow-10': '#fef9e7',
        'yellow-20': '#fdf0c4',
        'yellow-30': '#fbe38a',
        'yellow-50': '#f5c518',
        'yellow-60': '#e6b400',
        'yellow-70': '#c99e00',

        'red-10': '#fdeaea',
        'red-20': '#f9d0d0',
        'red-30': '#f3a3a3',
        'red-60': '#e03e3e',
        'red-70': '#c43030',
        'red-90': '#8e2222',

        'blue-10': '#e8f1fd',
        'blue-20': '#d0e2fa',
        'blue-30': '#a3c8f5',
        'blue-60': '#4a90d9',
        'blue-70': '#3a78bd',
        'blue-90': '#2a5688',

        'chart-1': 'hsl(var(--chart-1))',
        'chart-2': 'hsl(var(--chart-2))',
        'chart-3': 'hsl(var(--chart-3))',
        'chart-4': 'hsl(var(--chart-4))',
        'chart-5': 'hsl(var(--chart-5))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4': '0.25rem',
        '8': '0.5rem',
        '10': '0.625rem',
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
        '24': '1.5rem',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      boxShadow: {
        '100': '0px 1px 2px rgba(221, 221, 221, 0.05)',
        '200': '0px 1px 3px rgba(221, 221, 221, 0.10)',
        '300': ' 0px 4px 6px rgba(221, 221, 221, 0.10), 0px 2px 4px rgba(221, 221, 221, 0.06)',
        '400': '0px 2px 8px rgba(93, 93, 93, 0.12)',
        '500': '0px 4px 12px rgba(93, 93, 93, 0.16)',
        '600': '0px 8px 16px rgba(93, 93, 93, 0.12)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities }) {
      const typographyUtilities = {
        /* ---------- Display ---------- */
        '.miora-display-xl': { fontFamily: 'peyda-extrabold', fontSize: '2rem', lineHeight: '2.5rem' },
        '.miora-display-lg': { fontFamily: 'peyda-extrabold', fontSize: '1.75rem', lineHeight: '2.25rem' },
        '.miora-display-md': { fontFamily: 'peyda-extrabold', fontSize: '1.5rem', lineHeight: '2rem' },

        /* ---------- Headline ---------- */
        '.miora-headline-lg': { fontFamily: 'peyda-bold', fontSize: '1.75rem', lineHeight: '2.25rem' },
        '.miora-headline-md': { fontFamily: 'peyda-bold', fontSize: '1.5rem', lineHeight: '2rem' },
        '.miora-headline-sm': { fontFamily: 'peyda-bold', fontSize: '1.25rem', lineHeight: '1.75rem' },
        '.miora-headline-xs': { fontFamily: 'peyda-bold', fontSize: '1rem', lineHeight: '1.5rem' },

        /* ---------- Label ---------- */
        '.miora-label-lg': { fontFamily: 'peyda-medium', fontSize: '1.125rem', lineHeight: '2rem' },
        '.miora-label-md': { fontFamily: 'peyda-medium', fontSize: '1rem', lineHeight: '1.75rem' },
        '.miora-label-sm': { fontFamily: 'peyda-medium', fontSize: '0.875rem', lineHeight: '1.5rem' },
        '.miora-label-xs': { fontFamily: 'peyda-medium', fontSize: '0.75rem', lineHeight: '1.25rem' },
        '.miora-label-2xs': { fontFamily: 'peyda-medium', fontSize: '0.625rem', lineHeight: '1.125rem' },

        /* ---------- Body ---------- */
        '.miora-body-lg': { fontFamily: 'peyda-regular', fontSize: '1.125rem', lineHeight: '2rem' },
        '.miora-body-md': { fontFamily: 'peyda-regular', fontSize: '1rem', lineHeight: '1.75rem' },
        '.miora-body-sm': { fontFamily: 'peyda-regular', fontSize: '0.875rem', lineHeight: '1.5rem' },
        '.miora-body-xs': { fontFamily: 'peyda-regular', fontSize: '0.75rem', lineHeight: '1.25rem' },
        '.miora-body-2xs': { fontFamily: 'peyda-regular', fontSize: '0.625rem', lineHeight: '1.125rem' },

        /* ---------- Caption ---------- */
        '.miora-caption-xs': { fontFamily: 'peyda-regular', fontSize: '0.75rem', lineHeight: '1.25rem' },
        '.miora-caption-2xs': { fontFamily: 'peyda-regular', fontSize: '0.625rem', lineHeight: '1.125rem' },
      };
      addUtilities(typographyUtilities);
    }),
  ],
};