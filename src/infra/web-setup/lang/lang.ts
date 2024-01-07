const changeLanguage = (lang: "en" | "pt-BR") => {
  const _html = document.getElementsByTagName("html")[0];

  _html.setAttribute("lang", lang);
};

export { changeLanguage };
