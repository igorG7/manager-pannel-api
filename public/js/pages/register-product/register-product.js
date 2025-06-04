import { ValidForm } from "../../util/form/validForm.js";
import { toggleSideMenu } from "../../util/ui/toggleSideMenu.js";
import { logoutEvent } from "../../util/ui/logoutEvent.js";

toggleSideMenu();
logoutEvent();

const form = new ValidForm();
