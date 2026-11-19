import { cloneTemplate, fill } from "./template.js";
import { giftCount } from "./text.js";

const renderItem = ({ name, shop, note, url }) => {
  const item = fill(cloneTemplate("item"), { name, shop, note });
  item.querySelector("a").href = url;
  return item;
};

const renderSet = ({ name, parts }) => {
  const set = fill(cloneTemplate("set"), { name });
  set.querySelector("ul").append(...parts.map(renderItem));
  return set;
};

const renderGift = (gift) => (gift.parts ? renderSet(gift) : renderItem(gift));

export const renderPerson = ({ id, name, shape, gifts }) => {
  const section = fill(cloneTemplate("person"), { name, count: giftCount(gifts.length) });
  const heading = section.querySelector("h2");
  heading.id = `${id}-name`;
  section.setAttribute("aria-labelledby", heading.id);
  section.dataset.shape = shape;
  section.querySelector("ul").append(...gifts.map(renderGift));
  return section;
};

export const renderChoice = ({ id, name, shape }) => {
  const choice = cloneTemplate("choice");
  choice.dataset.shape = shape;
  choice.querySelector("input").value = id;
  choice.append(name);
  return choice;
};
