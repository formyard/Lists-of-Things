import { cloneTemplate, fill } from "./template.js";
import { tally } from "./text.js";

const shopLine = ({ shop, blackOwned }) => (blackOwned ? `${shop}, Black-owned` : shop);

const renderItem = (gift) => {
  const item = fill(cloneTemplate("item"), { name: gift.name, shop: shopLine(gift), note: gift.note });
  Object.assign(item.querySelector("a"), { href: gift.url, target: "_blank", rel: "noopener" });
  return item;
};

const renderSet = ({ name, parts }) => {
  const set = fill(cloneTemplate("set"), { name });
  set.querySelector("ul").append(...parts.map(renderItem));
  return set;
};

const renderGift = (gift) => (gift.parts ? renderSet(gift) : renderItem(gift));

const renderGroup = (template, fields, headingId, gifts) => {
  const group = fill(cloneTemplate(template), fields);
  group.querySelector("h2, h3").id = headingId;
  group.setAttribute("aria-labelledby", headingId);
  group.querySelector("ul").append(...gifts.map(renderGift));
  return group;
};

const renderWishlist = ({ id, name, wishlist }) =>
  renderGroup("wishlist", { title: `${name}’s wish list` }, `${id}-wishlist`, wishlist);

export const renderPerson = (person) => {
  const { id, name, shape, gifts, wishlist } = person;
  const section = renderGroup("person", { name, count: tally(person) }, `${id}-name`, gifts);
  section.dataset.shape = shape;
  if (wishlist) section.append(renderWishlist(person));
  return section;
};

export const renderChoice = ({ id, name, shape }) => {
  const choice = cloneTemplate("choice");
  choice.dataset.shape = shape;
  choice.querySelector("input").value = id;
  choice.append(name);
  return choice;
};
