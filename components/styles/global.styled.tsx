import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   /* @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap'); */
   /* Box sizing rules */
   *,
   *::before,
   *::after {
      box-sizing: border-box;
   }

   /* Remove default padding */
   ul[class],
   ol[class] {
      padding: 0;
   }

   /* Remove default margin */
   body,
   h1,
   h2,
   h3,
   h4,
   p,
   ul[class],
   ol[class],
   li,
   figure,
   figcaption,
   blockquote,
   dl,
   dd {
      margin: 0;
   }

   /* Set core body defaults */
   body {
      min-height: 100vh;
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.5;
      background: #F7F7F7;
   }

   /* Remove list styles on ul, ol elements with a class attribute */
   ul[class],
   ol[class] {
      list-style: none;
   }

   /* A elements that don't have a class get default styles */
   a:not([class]) {
      text-decoration-skip-ink: auto;
   }

   a {
      cursor: pointer;
      text-decoration: none;
   }
   button {
      cursor: pointer;
      border: none;
   }

   /* Make images easier to work with */
   img {
      max-width: 100%;
      display: block;
   }

   /* Natural flow and rhythm in articles by default */
   article > * + * {
      margin-top: 1em;
   }

   /* Inherit fonts for inputs and buttons */
   input,
   button,
   textarea,
   select {
      font: inherit;
   }

   .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .d-none {
      display: none;
   }
`;

export const styledTheme = {
   bgColor: "#F5F5F5",
   mainYellow: "#FFE300",
   iconGray: "#8d8d8d",
   textMain: "#626262",
   devices: {
      tablet: "600px",
      latop: "900px",
      desktop: "1200px",
   },
};
