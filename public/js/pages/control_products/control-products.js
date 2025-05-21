import { ValidForm } from "../../util/form/validForm.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("_id");
console.log(id);

const form = new ValidForm(id);
