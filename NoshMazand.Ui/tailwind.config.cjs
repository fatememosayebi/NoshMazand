/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    safelist:[
        {pattern: /grid-cols-*/,},
        {pattern: /col-span-*/,},
        {pattern: /gap-*-*/,},
        {pattern: /space-*-*/,},
        {pattern: /text-(right-left-center)/,},
        {pattern: /p(x|y|t|b|r|l)-*/},
        {pattern: /m(x|y|t|b|r|l)-*/},
        {pattern: /(sm|md|lg|xl|2xl):w-*/},
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4361ee',
                    light: '#eaf1ff',
                    'dark-light': 'rgba(67,97,238,.15)',
                },
                secondary: {
                    DEFAULT: '#805dca',
                    light: '#ebe4f7',
                    'dark-light': 'rgb(128 93 202 / 15%)',
                },
                success: {
                    DEFAULT: '#00ab55',
                    light: '#ddf5f0',
                    'dark-light': 'rgba(0,171,85,.15)',
                },
                danger: {
                    DEFAULT: '#e7515a',
                    light: '#fff5f5',
                    'dark-light': 'rgba(231,81,90,.15)',
                },
                warning: {
                    DEFAULT: '#e2a03f',
                    light: '#fff9ed',
                    'dark-light': 'rgba(226,160,63,.15)',
                },
                info: {
                    DEFAULT: '#2196f3',
                    light: '#e7f7ff',
                    'dark-light': 'rgba(33,150,243,.15)',
                },
                dark: {
                    DEFAULT: '#3b3f5c',
                    light: '#eaeaec',
                    'dark-light': 'rgba(59,63,92,.15)',
                },
                black: {
                    DEFAULT: '#0e1726',
                    light: '#e3e4eb',
                    'dark-light': 'rgba(14,23,38,.15)',
                },
                white: {
                    DEFAULT: '#ffffff',
                    light: '#e0e6ed',
                    dark: '#888ea8',
                },
            },
            // backgroundImage:{
            //     loginBack:'linear-gradient(to right bottom, #37d9fb, #2fccf0, #28bee5, #22b1da, #1da4ce, #30a5ce, #3ea6ce, #49a7ce, #63b6da, #7ac5e6, #90d4f2, #a6e4ff)'
            // },
            fontFamily: {
                yekan: ['Yekan Bakh', 'sans-serif'],
                yekanFat: ['Yekan Bakh Fat', 'sans-serif'],
            },
            spacing: {
                4.5: '18px',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-invert-headings': theme('colors.white.dark'),
                        '--tw-prose-invert-links': theme('colors.white.dark'),
                        h1: { fontFamily:'yekanFat', fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
                        h2: { fontFamily:'yekanFat', fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
                        h3: { fontFamily:'yekanFat', fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
                        h4: { fontFamily:'yekanFat', fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
                        h5: { fontFamily:'yekanFat', fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
                        h6: { fontFamily:'yekanFat', fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
                        p: { marginBottom: '0.5rem' },
                        li: { margin: 0 },
                        img: { margin: 0 },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
};
