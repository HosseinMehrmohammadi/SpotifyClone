import { urlRoute } from "./routing";

export const loadPlaylist = (ul: any) => {
    let tempLi = document.createElement("li");
    tempLi.classList.add("rec-search-item");
    let tempImg = document.createElement("img");
    tempImg.classList.add("item-img");
    tempImg.src = "/song-img.0f385f15.jpg";
    let tempDiv = document.createElement("div");
    tempDiv.classList.add("item-title-container");
    let artistTitle = document.createElement("p");
    artistTitle.classList.add("item-name");
    artistTitle.innerText = "Liked Songs";

    tempDiv.append(artistTitle);
    tempLi.append(tempImg, tempDiv);
    ul?.append(tempLi);

    tempLi.addEventListener('click', () => {
        urlRoute("/library/playlists/playlist");
    });
}

export const search = (artists: any, searchbar: any) => {
    artists.forEach((elem: string) => {
        if (elem.toLowerCase() === searchbar.value.trim().toLowerCase()) {
            urlRoute("/library/playlists/playlist");
        }
    });
    searchbar.value = "";
}
