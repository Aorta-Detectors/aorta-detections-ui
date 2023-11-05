/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        "theme-base-bg": "var(--color-bg)",
        "theme-primary0": "var(--primary0)",
        "theme-primary10": "var(--primary10)",
        "theme-primary20": "var(--primary20)",
        "theme-primary25": "var(--primary25)",
        "theme-primary30": "var(--primary30)",
        "theme-primary35": "var(--primary35)",
        "theme-primary40": "var(--primary40)",
        "theme-primary50": "var(--primary50)",
        "theme-primary60": "var(--primary60)",
        "theme-primary70": "var(--primary70)",
        "theme-primary80": "var(--primary80)",
        "theme-secondary0": "var(----secondary0)",
        "theme-secondary10": "var(--secondary10)",
        "theme-secondary20": "var(--secondary20)",
        "theme-secondary30": "var(--secondary30)",
        "theme-secondary40": "var(--secondary40)",
      },
    },
  },
  plugins: [],
}

