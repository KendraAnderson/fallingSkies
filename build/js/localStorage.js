export function localStore(storage_name, key, value) {
  let existing = localStorage.getItem(storage_name);
  existing = existing ? JSON.parse(existing) : {};
  existing[key] = value;
  localStorage.setItem(storage_name, JSON.stringify(existing));
}
export function getStore(keyName) {
  if (localStorage.getItem(keyName)) {
    let got = localStorage.getItem(keyName);
    return got;
  } else {
    const errorMessage = "Check Local Storage, the key name provided does not exist.";
    return errorMessage;
  }
}
