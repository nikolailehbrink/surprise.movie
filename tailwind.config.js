/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./components/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},

		extend: {
			colors: {
				blue: {
					DEFAULT: "#0B8DD8",
					50: "#F8FCFF",
					100: "#DBF1FD",
					200: "#A0D9FA",
					300: "#66C2F7",
					400: "#2CABF4",
					500: "#0B8DD8",
					600: "#0974B1",
					700: "#075A8A",
					800: "#054164",
					900: "#03283D",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontFamily: {
				inter: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
