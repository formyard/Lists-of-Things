export const toId = (text) =>
  text
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const giftCount = (count) => `${count} ${count === 1 ? "gift" : "gifts"}`;
