import { Song } from "../models/song";
import * as svgRes from "../res/svg";
import { urlRoute } from "./routing";

export const getAlbumData = (data: any, currentAlbum: any, musics: Song[]) => {
    data.forEach((elem: { album: { id: any; }; musics: Song[]; }) => {
        if (elem.album.id == currentAlbum.id) {
            elem.musics.forEach(m => {
                musics.push(m);
            });
        }
    });
}

export const loadAlbum = (albumImg: any, currentAlbum: any, albumName: any, composer: any,
    musics: Song[], ul: any) => {
    albumImg!.src = currentAlbum.album_thumb;
    albumName!.innerText = currentAlbum.album_name;
    composer!.innerText = currentAlbum.album_composer;

    musics.forEach((elem: Song) => {
        let tempLi = document.createElement("li");
        tempLi.classList.add("album-music");
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("music");
        let songTitle = document.createElement("p");
        songTitle.classList.add("song-title-playlist");
        songTitle.innerText = elem.track_name;
        let dwDiv = document.createElement("div");
        dwDiv.classList.add("download");
        let svgDiv = document.createElement("div");
        svgDiv.innerHTML = svgRes.notDw;
        let songComposer = document.createElement("p");
        songComposer.classList.add("artists-playlist");
        songComposer.innerText = currentAlbum.album_composer;

        dwDiv.append(svgDiv, songComposer);
        tempDiv.append(songTitle, dwDiv);
        tempLi.appendChild(tempDiv);
        ul?.appendChild(tempLi);

        songTitle.addEventListener('click', () => {
            localStorage.setItem("current_music", JSON.stringify(elem));
            urlRoute("/library/albums/" + currentAlbum.id + "/" + elem.id);
        });
    });
}
