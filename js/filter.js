import { tally } from "./text.js";

const FIELD = "for";

const combine = (people) => ({
  gifts: people.flatMap(({ gifts }) => gifts),
  wishlist: people.flatMap(({ wishlist = [] }) => wishlist)
});

const describe = (people, chosen) =>
  chosen ? `Showing ${tally(chosen)} for ${chosen.name}.` : `Showing all ${tally(combine(people))}.`;

const readChoice = () => new URLSearchParams(location.search).get(FIELD);

const writeChoice = (chosen) => {
  const url = new URL(location.href);
  if (chosen) url.searchParams.set(FIELD, chosen.id);
  else url.searchParams.delete(FIELD);
  history.replaceState(history.state, "", url);
};

export const initFilter = ({ fieldset, status, entries }) => {
  const people = entries.map(({ person }) => person);
  const findPerson = (id) => people.find((person) => person.id === id);
  const radio = (state) => fieldset.querySelector(`[name="${FIELD}"]${state}`);

  const update = () => {
    const chosen = findPerson(radio(":checked").value);
    entries.forEach(({ person, section }) => {
      section.hidden = Boolean(chosen) && person !== chosen;
    });
    status.textContent = describe(people, chosen);
    writeChoice(chosen);
  };

  const requested = findPerson(readChoice());
  if (requested) radio(`[value="${requested.id}"]`).checked = true;
  update();
  fieldset.addEventListener("change", update);
};
