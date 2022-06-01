export function localStore(storage_name, key, value) {
  //
  // let storage_name = "Test Storage";
  // let key = "Key Test";
  // let value = "Value 1";
  //if (localStorage.getItem(`${storage_name}`)) { //storage_name = window.localStorage.key

  //get existing
  let existing = localStorage.getItem(storage_name);
  //If existing is negative, create it
  existing = existing ? JSON.parse(existing) : {};

  existing[key] = value;
  //console.log(`store 11 ${existing}`);

  // Return to storage
  localStorage.setItem(storage_name, JSON.stringify(existing));
  //};
}

export function getStore(keyName) {
  if (localStorage.getItem(keyName)) {
    let got = localStorage.getItem(keyName);
    //console.log(`GOT 26 ${got}`);
    return got;
  } else {
    const errorMessage =
      "Check Local Storage, the key name provided does not exist.";
    //console.log(errorMessage);
    return errorMessage;
  }
}
