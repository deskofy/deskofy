const encodeHTML = (htmlContent: string): string =>
  `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;

export { encodeHTML };
