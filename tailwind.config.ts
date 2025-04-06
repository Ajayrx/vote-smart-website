
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				voting: {
					primary: '#1a4c8b',
					secondary: '#3b82f6',
					accent: '#dbeafe',
					danger: '#dc2626',
					success: '#16a34a'
				},
				futuristic: {
					dark: '#060c17',
					panel: '#0a1926',
					accent: '#22d3ee',
					glow: '#06b6d4',
					text: '#94a3b8'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0.5)' 
					},
					'50%': { 
						boxShadow: '0 0 25px 10px rgba(59, 130, 246, 0.7)' 
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0' 
					},
					'100%': { 
						opacity: '1' 
					}
				},
				'ping-slow': {
					'75%, 100%': {
						transform: 'scale(1.5)',
						opacity: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						opacity: '0.6'
					},
					'50%': {
						opacity: '1'
					}
				},
				'scan-line': {
					'0%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(100%)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'fade-in': 'fade-in 0.5s ease-in',
				'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s infinite',
				'scan-line': 'scan-line 3s linear infinite'
			},
			backgroundImage: {
				'grid-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBzdHJva2U9IiM4QkEyRkYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgc3Ryb2tlLXdpZHRoPSIuNSI+PHBhdGggZD0iTTYwIDBoLTEuNUE1OC41IDU4LjUgMCAwIDAgMCA1OC41VjYwaDEuNUE1OC41IDU4LjUgMCAwIDAgNjAgMS41eiIvPjwvZz48L2c+PC9zdmc+')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
