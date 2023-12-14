const add_meta_tag = (attributes: Array<{ name: string; value: string }>) => {
  const meta = document.createElement("meta");

  attributes.forEach((data) => {
    meta.setAttribute(data.name, data.value);
  });

  document.head.appendChild(meta);
};

export const add_metadata = () => {
  add_meta_tag([
    { name: "name", value: "apple-mobile-web-app-capable" },
    { name: "content", value: "yes" },
  ]);
  add_meta_tag([
    { name: "name", value: "mobile-web-app-capable" },
    { name: "content", value: "yes" },
  ]);
};
