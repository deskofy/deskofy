const htmlError = (error: string): string => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <title>Deskofy</title>

    <style>
      *,
      *::after,
      *::before {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        -webkit-app-region: drag;
        background: #ffffff;
        align-items: center;
        display: flex;
        height: 100vh;
        justify-content: center;
        width: 100vw;
      }

      .container {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        gap: 24px;
        width: auto;
      }

      .logo {
        width: 24px;
        height: 24px;
        aspect-ratio: 1/1;
      }

      .title {
        align-self: stretch;
        color: #000000;
        font-family: "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono", monospace;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-align: center;
      }

      .description {
        align-self: stretch;
        color: #444444;
        font-family: "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono", monospace;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <svg
        class="logo"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.0156 2.96734C11.2454 2.26463 12.7547 2.26463 13.9844 2.96734L19.3177 6.01421C20.564 6.72639 21.3334 8.05276 21.3334 9.48817V15.5116L21.3242 15.7798C21.235 17.1106 20.4859 18.3167 19.3177 18.9843L13.9844 22.0324L13.7513 22.1561C12.6465 22.6943 11.3535 22.6943 10.2487 22.1561L10.0156 22.0324L4.68231 18.9843C3.43608 18.2721 2.66674 16.947 2.66669 15.5116V9.48817C2.66669 8.14231 3.34282 6.89248 4.45445 6.15484L4.68231 6.01421L10.0156 2.96734ZM12.6615 5.28244C12.2516 5.0482 11.7485 5.04821 11.3386 5.28244L6.00523 8.32931C5.58983 8.56671 5.33335 9.00972 5.33335 9.48817V15.5116C5.3334 15.99 5.58986 16.4318 6.00523 16.6692L10.6667 19.3332V16.9712C8.73938 16.3974 7.33352 14.6136 7.33335 12.4999C7.33335 9.92256 9.42269 7.83322 12 7.83322C14.5773 7.83322 16.6667 9.92256 16.6667 12.4999C16.6665 14.6136 15.2607 16.3974 13.3334 16.9712V19.3332L17.9948 16.6692C18.4102 16.4318 18.6666 15.99 18.6667 15.5116V9.48817C18.6667 9.00972 18.4102 8.56671 17.9948 8.32931L12.6615 5.28244ZM12 10.4999C10.8955 10.4999 10 11.3953 10 12.4999C10.0002 13.6043 10.8956 14.4999 12 14.4999C13.1045 14.4999 13.9998 13.6043 14 12.4999C14 11.3953 13.1046 10.4999 12 10.4999Z"
          fill="black"
        />
      </svg>

      <p class="title">${error}</p>

      <p class="description">Replace this with your custom error page.</p>
    </div>
  </body>
</html>
`;

export { htmlError };
