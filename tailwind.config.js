/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
      extend: {
          colors: {
              primaryBlack: "#010102",
              iconColor: "#4f4f59",
              secondaryText: "#C7C1BF",
              gold: "#B98C62",
              goldBg: "#F6F1EB",
              btnBlack: "#414249",
              border: "#E3DEDC",
              blueText: "#93C4DF",
              blueTagBg: "#F1F5F9",
              succeed: "#76c16a",
              succeedBg: "#e9f5e7",
              blueTag: "#99AFC5",
              alert: "#EFB215",
              error: "#E80B32"
          },
          spacing: {
            'i': '49rem',  
            'e': '45rem', 
            '25rem':'25rem',
            '84rem':'65rem', 
          },
          fontSize: {
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',     // Custom new size
            '8xl': '6rem',     // Custom new size
            '9xl': '8rem'      // Custom new size
          },
          height:{
            'button-long':'23rem',
            'button-short':'4rem',
          },
          width: {
            'button-long':'23rem',
            'button-short':'4rem',
            'button-longer':'28rem',
            'short':'7rem',
            'middle':'14rem',
            'long':'19rem',
            '96': '24rem', 
            '100':'28rem',   
            '128': '32rem',   // Custom width equivalent to 512px
            '144': '36rem',   // Custom width equivalent to 576px

          },
          wordSpacing: {
            normal: 'normal',
            wide: '0.125em',  // Example: Adds slightly wider spacing
            wider: '0.25em',  // Example: Adds more space
            widest: '0.5em'   // Example: Adds the most space
          },
          letterSpacing: {
            tightest: '-.075em',
            tighter: '-.05em',
            tight: '-.025em',
            normal: '0',
            wide: '.025em',
            wider: '.05em',
            widest: '.3em',
          }
      },
  },
  variants: {
    wordSpacing: ['responsive']
  },
  plugins: [],
}


