import { Album } from "../models/album";
import { Item } from "../models/item";

export const getHomeData = (data: any, albums: Album[], musics: Item[]) => {
    data.forEach((elem: { album: Album; musics: any; }) =>  {
        let tempItem: Item = {
            albumID: elem.album.id,
            songs: elem.musics
        }
        albums.push(elem.album);
        musics.push(tempItem);
    });
}

export const loadrecPlayed = (recPlayed: any, recPlayedList: any, albums: Album[]) => {
    let count: number = 0;
    for (let i of recPlayed.reverse()) {
        albums.forEach(e => {
            if (e.id == i) {
                count++;
                let tempImg = document.createElement("img");
                tempImg.src = e.album_thumb;
                tempImg.style.width = "124px";
                tempImg.style.height = "124px";
                let tempP = document.createElement("p")
                tempP.classList.add("playlist-name");
                tempP.style.fontWeight = "400"
                tempP.innerText = e.album_name;
    
                recPlayedList?.append(tempImg, tempP);
            }
        });
    
        if (count == 10) break;
    }
}

export const loadMadeForYou = (madeForYouList: any,  albums: Album[]) => {
    let count: number = 0;
    let flag: number = 0
    while (flag < 10) {
        if (albums[count].album_thumb != "") {
            let tempImg = document.createElement("img");
            tempImg.src = albums[count].album_thumb;
            tempImg.style.width = "166px";
            madeForYouList?.appendChild(tempImg);
            flag++;
        }
        count++;
    }
}
