export const toId = (text) =>
  text
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const plural = (count, noun) => `${count} ${noun}${count === 1 ? "" : "s"}`;

export const tally = ({ gifts, wishlist = [] }) =>
  wishlist.length
    ? `${plural(gifts.length, "gift")} and ${plural(wishlist.length, "wish list item")}`
    : plural(gifts.length, "gift");
