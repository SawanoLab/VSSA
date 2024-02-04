/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            gridColumn: {
                '16': 'repeat(16, minmax(0, 1fr))',
            },
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
            },
            animation: {
                "slide-in-blurred-right": "slide-in-blurred-right 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both"
            },
            keyframes: {
                "slide-in-blurred-right": {
                    "0%": {
                        transform: "translateX(1000px) scaleX(2.5) scaleY(.2)",
                        "transform-origin": "0% 50%",
                        filter: "blur(40px)",
                        opacity: "0"
                    },
                    to: {
                        transform: "translateX(0) scaleY(1) scaleX(1)",
                        "transform-origin": "50% 50%",
                        filter: "blur(0)",
                        opacity: "1"
                    }
                }
            }
        }
    },
    plugins: [],
}
