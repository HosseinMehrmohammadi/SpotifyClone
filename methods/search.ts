import { RecentSearch } from "../models/recentSearch";
import * as svgRes from "../res/svg";
import * as data from "../res/data.json";
import { Album } from "../models/album";
import { urlRoute } from "./routing";

const onlyUnique = (value: any, index: any, self: any[]) => {
    return index === self.findIndex((t) => (
        t.id === value.id
    ));
}

export const getSearchData = (data: any, names: RecentSearch[], datalist: any) => {
    data.forEach((elem: { musics: any[]; }) => {
        elem.musics.forEach(music => {
            let tempOption = document.createElement("option");
            tempOption.text = music.track_name;
            names.push({
                name: music.track_name,
                id: music.id,
            });
            datalist?.appendChild(tempOption)
        });
    });
}

export const laodRecentlySearched = (recentList: any,data: any, ul: any) => {
    recentList.reverse().forEach((elem: { id: string | number; }) => {
        data.forEach((e: { musics: any[]; album: Album }) => {
            e.musics.forEach( m => {
                if (m.id == elem.id) {
                    let tempLi = document.createElement("li");
                    tempLi.classList.add("rec-search-item");
                    let tempImg = document.createElement("img");
                    tempImg.classList.add("item-img");
                    tempImg.src = m.track_thumb;
                    let tempDiv = document.createElement("div");
                    tempDiv.classList.add("item-title-container");
                    let songTitle = document.createElement("p");
                    songTitle.classList.add("item-name");
                    songTitle.innerText = m.track_name;
                    let songComposer = document.createElement("p");
                    songComposer.classList.add("item-title");
                    songComposer.innerText = e.album.album_composer;
                    let temp = document.createElement("div");
                    temp.style.display = "flex";
                    temp.innerHTML = svgRes.cross;
    
                    temp.addEventListener('click', () => {
                        recentList.splice(recentList.indexOf(elem), 1);
                        localStorage.setItem("music_searchedList", JSON.stringify(recentList));
                        ul?.removeChild(tempLi);
                    });
    
                    tempDiv.append(songTitle, songComposer);
                    tempLi.append(tempImg, tempDiv, temp);
                    ul?.append(tempLi);

                    tempLi.addEventListener('click', () => {
                        localStorage.setItem("current_album", JSON.stringify(e.album));
                        localStorage.setItem("current_music", JSON.stringify(m));
                        urlRoute("/library/albums/" + e.album.id + "/" +  elem.id);
                    });
                }
            });
        });
    });
}

export const search = (names: any, searchbar: any, recentList: any) => {
    names.forEach((elem: { name: string; id: string | number; }) => {
        if (elem.name.toLowerCase() === searchbar.value.trim().toLowerCase()) {
            let tempAlbumId: string | number;
            recentList.push({
                name: elem.name,
                id: elem.id
            });
            recentList = recentList.reverse().filter(onlyUnique);
            recentList = recentList.reverse();
            localStorage.setItem("music_searchedList", JSON.stringify(recentList));
            data.forEach(e => {
                e.musics.forEach( m => {
                    if (m.id == elem.id) {
                        tempAlbumId = e.album.id;
                        localStorage.setItem("current_album", JSON.stringify(e.album));
                        localStorage.setItem("current_music", JSON.stringify(m));
                    }
                });
            });
            urlRoute("/library/albums/" + tempAlbumId! + "/" +  elem.id);
        }
    });
    searchbar.value = "";
}
