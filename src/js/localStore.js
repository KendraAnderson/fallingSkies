export function localStore(storage_name, key, value) {
        localStorage.setItem(storage_name, {key, value});
}