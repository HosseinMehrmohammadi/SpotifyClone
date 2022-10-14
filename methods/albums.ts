import { Album } from "../models/album";
import { urlRoute } from "./routing";

export const getAlbumsData = (data: any, albums: any, datalist: any) => {
    data.forEach((elem: { album: { album_name: string; }; }) => {
        if (elem.album.album_name != "") {
            albums.push(elem.album);
            let tempOption = document.createElement("option");
            tempOption.text = elem.album.album_name;
            datalist?.appendChild(tempOption);
        }
    });
}

export const loadAlbums =(albums: any, ul: any) => {
    albums.forEach((elem: Album) => {
        let tempLi = document.createElement("li");
        tempLi.classList.add("rec-search-item");
        let tempImg = document.createElement("img");
        tempImg.classList.add("item-img");
        tempImg.src = elem.album_thumb;
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("item-title-container");
        let albumTitle = document.createElement("p");
        albumTitle.classList.add("item-name");
        albumTitle.innerText = elem.album_name;
        let composer = document.createElement("p");
        composer.classList.add("item-title");
        composer.innerText = elem.album_composer;
    
        tempDiv.append(albumTitle, composer);
        tempLi.append(tempImg, tempDiv);
        ul?.append(tempLi);
    
        tempLi.addEventListener('click', () => {
            localStorage.setItem("current_album", JSON.stringify(elem));
            urlRoute("/library/albums/" + elem.id);
        });
    });
}

export const search = (albums: any, searchbar: any) => {
    albums.forEach((elem: Album) => {
        if (elem.album_name.toLowerCase() === searchbar.value.trim().toLowerCase()) {
            localStorage.setItem("current_album", JSON.stringify(elem));
            urlRoute("/library/albums/" + elem.id);
        }
    });
    searchbar.value = "";
}
