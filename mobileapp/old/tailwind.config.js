const { hairlineWidth } = require('nativewind/theme');

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
        'peyda-extralight': 'peyda-extra-light',
        'peyda-light': 'Peyda-light',
        'peyda-medium': 'peyda-medium',
        'peyda-semibold': 'peyda-semi-bold',
        'peyda-bold': 'peyda-bold',
        'peyda-extrabold': 'peyda-extraBold',
        'peyda-black': 'peyda-black',
      },
      colors: {
        // ═══════════════════════════════════════════
        // Semantic Colors (از :root در global.css)
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
        // Palette Colors (از @theme در global.css)
        // ═══════════════════════════════════════════
        
        // Primary
        'primary-70': '#454545',
        'primary-80': '#262626',
        'primary-95': '#141414',
        'primary-100': '#000000',

        // Neutral
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

        // Disabled
        disabled: '#E3E3E5',

        // Green
        'green-10': '#e6f7f1',
        'green-20': '#c8efe3',
        'green-30': '#96e0c8',
        'green-60': '#2eb88a',
        'green-70': '#259a74',
        'green-90': '#1a6e54',

        // Yellow
        'yellow-10': '#fef9e7',
        'yellow-20': '#fdf0c4',
        'yellow-30': '#fbe38a',
        'yellow-50': '#f5c518',
        'yellow-60': '#e6b400',
        'yellow-70': '#c99e00',

        // Red
        'red-10': '#fdeaea',
        'red-20': '#f9d0d0',
        'red-30': '#f3a3a3',
        'red-60': '#e03e3e',
        'red-70': '#c43030',
        'red-90': '#8e2222',

        // Blue
        'blue-10': '#e8f1fd',
        'blue-20': '#d0e2fa',
        'blue-30': '#a3c8f5',
        'blue-60': '#4a90d9',
        'blue-70': '#3a78bd',
        'blue-90': '#2a5688',

        // Chart Colors
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
        '4': 'var(--radius-4)',
        '8': 'var(--radius-8)',
        '10': 'var(--radius-10)',
        '12': 'var(--radius-12)',
        '14': 'var(--radius-14)',
        '16': 'var(--radius-16)',
        '24': 'var(--radius-24)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      boxShadow: {
        '100': 'var(--shadow-100)',
        '200': 'var(--shadow-200)',
        '300': 'var(--shadow-300)',
        '400': 'var(--shadow-400)',
        '500': 'var(--shadow-500)',
        '600': 'var(--shadow-600)',
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
  plugins: [require('tailwindcss-animate')],
};