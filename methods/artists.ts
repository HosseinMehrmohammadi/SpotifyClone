import * as data from "../res/data.json";
import { urlRoute } from "./routing";

export const getArtistsData = (data: any, artists: any, datalist: any) => {
    data.forEach((elem: { album: { album_composer: string; }; }) => {
        if (elem.album.album_composer != "") {
            artists.push(elem.album.album_composer);
            let tempOption = document.createElement("option");
            tempOption.text = elem.album.album_composer;
            datalist?.appendChild(tempOption);
        }
    });
}

export const loadArtists = (artists: any, ul: any) => {
    artists.forEach((elem: string) => {
        let tempLi = document.createElement("li");
        tempLi.classList.add("rec-search-item");
        let tempImg = document.createElement("img");
        tempImg.classList.add("item-img-circle");
        tempImg.src = "/Artist.0bc3df82.jpg";
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("item-title-container");
        let artistTitle = document.createElement("p");
        artistTitle.classList.add("item-name");
        artistTitle.innerText = elem;
    
        tempDiv.append(artistTitle);
        tempLi.append(tempImg, tempDiv);
        ul?.append(tempLi);

        tempLi.addEventListener('click', () => {
            localStorage.setItem("currentArtist", JSON.stringify(elem));
            urlRoute("/library/artists/" + elem);
        });
    });
}

export const search = (artists: any, searchbar: any) => {
    artists.forEach((elem: string) => {
        if (elem.toLowerCase() === searchbar.value.trim().toLowerCase()) {
            localStorage.setItem("currentArtist", JSON.stringify(elem));
            urlRoute("/library/artists/" + elem);
        }
    });
    searchbar.value = "";
}
