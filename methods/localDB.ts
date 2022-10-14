export let biData: Blob;

export const dbAction = (id: number, action: string, data?: any) => {
    let request = window.indexedDB.open("spotifyDB", 1);

    request.onerror = (event) => {
        console.error(event);
    }
    request.onupgradeneeded = () => {
        let db = request.result;
        db.createObjectStore("musics");
    }
    request.onsuccess = () => {
        let db = request.result;
        let transaction = db.transaction("musics", "readwrite");
        let store = transaction.objectStore("musics");

        if (action == "get") {
            let getReq =  store.get(id);
            getReq.onsuccess = () => {
                biData = getReq.result;
            }
            getReq.onerror = (event) => {
                console.error(event);
            }
        } else if (action == "put") {
            let addReq = store.put(data, id);
            addReq.onsuccess = () => {
                console.log("put success");
            }
            addReq.onerror = (event) => {
                console.error(event);
            }
        }
    }
}
