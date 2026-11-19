export const cloneTemplate = (name) =>
  document.getElementById(`${name}-template`).content.firstElementChild.cloneNode(true);

export const fill = (root, fields) => {
  Object.entries(fields).forEach(([field, value]) => {
    const slot = root.querySelector(`[data-field="${field}"]`);
    slot.removeAttribute("data-field");
    if (value) slot.textContent = value;
    else slot.remove();
  });
  return root;
};
