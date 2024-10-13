/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				hextech_black: '#020B14',
				gold: {
					1: '#F0E6D2',
					4: '#C89B3C'
				}
			},
			fontFamily: {
				spiegel: ['spiegel'],
				beaufort: ['beaufort']
			}
		}
	},
	plugins: [require('@xpd/tailwind-3dtransforms')]
};