import { people } from "./gifts.js";
import { initFilter } from "./filter.js";
import { renderChoice, renderPerson } from "./render.js";
import { toId } from "./text.js";

const fieldset = document.getElementById("filter");

const entries = people
  .map((person) => ({ ...person, id: toId(person.name) }))
  .map((person) => ({ person, section: renderPerson(person) }));

fieldset.querySelector("legend").after(...entries.map(({ person }) => renderChoice(person)));
document.getElementById("gifts").replaceChildren(...entries.map(({ section }) => section));

initFilter({ fieldset, status: document.getElementById("filter-status"), entries });
