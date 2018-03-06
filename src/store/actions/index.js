// this is the file that helps to export all actions just from one file. will be usefull later on, dont
// forget to add new actions in export in this file when you create them.
export {
  addPlace,
  deletePlace,
  getPlaces,
  placeAdded,
  startAddPlace
} from "./places";
export { tryAuth, authGetToken, authAutoSignIn, authLogout } from "./auth";
export { uiStartLoading, uiStopLoading } from "./ui";
