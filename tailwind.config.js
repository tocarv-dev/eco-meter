/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      // Primary
      'marine-blue': 'hsl(213, 96%, 18%)',
      'purplish-blue': 'hsl(243, 100%, 62%)',
      'pastel-blue': 'hsl(228, 100%, 84%)',
      'light-blue': 'hsl(206, 94%, 87%)',
      'strawberry-red': 'hsl(354, 84%, 57%)',
      // Neutral
      'cool-gray': 'hsl(231, 11%, 63%)',
      'white-green': 'hsl(165, 40%, 98%)',
      'faint-green': 'hsl(164, 38.5%, 92.4%)',
      'light-green': 'hsl(179, 70.5%, 35.9%)',
      'mid-green': 'hsl(179, 70%, 25%)',
      'dark-green': 'hsl(179, 70%, 18%)',
      'deep-green': 'hsl(175, 68.4%, 3.7%)',
      magnolia: 'hsl(217, 100%, 97%)',
      alabaster: 'hsl(231, 100%, 99%)',
      white: 'hsl(0, 0%, 100%)',
      // Other
      transparent: 'rgba(0,0,0,0)',
    },
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
