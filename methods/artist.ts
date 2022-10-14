import { Album } from "../models/album";
import { Song } from "../models/song";
import * as svgRes from "../res/svg";
import { urlRoute } from "./routing";

export const getArtistData = (data: any, currentArtist: any, musics: {song: Song, id: string | number}[], albums: any) => {
    data.forEach((elem: { album: Album; musics: Song[]; }) => {
        if (elem.album.album_composer == currentArtist) {
            albums.push(elem.album);
            elem.musics.forEach(m => {
                musics.push({song: m, id: elem.album.id});
            });
        }
    });
}

export const loadArtist = (currentArtist: any, artistName: any, musics: {song: Song, id: string | number}[], ul: any, albums: any) => {
    artistName!.innerText = currentArtist;

    musics.forEach((elem) => {
        let tempLi = document.createElement("li");
        tempLi.classList.add("album-music");
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("music");
        let songTitle = document.createElement("p");
        songTitle.classList.add("song-title-playlist");
        songTitle.innerText = elem.song.track_name;
        let dwDiv = document.createElement("div");
        dwDiv.classList.add("download");
        let svgDiv = document.createElement("div");
        svgDiv.innerHTML = svgRes.notDw;
        let songComposer = document.createElement("p");
        songComposer.classList.add("artists-playlist");
        songComposer.innerText = currentArtist;

        dwDiv.append(svgDiv, songComposer);
        tempDiv.append(songTitle, dwDiv);
        tempLi.appendChild(tempDiv);
        ul?.appendChild(tempLi);

        songTitle.addEventListener('click', () => {
            albums.forEach((album: Album) => {
                if (album.id == elem.id) {
                    localStorage.setItem("current_album", JSON.stringify(album));
                }
            });
            localStorage.setItem("current_music", JSON.stringify(elem.song));
            urlRoute("/library/albums/" + elem.id + "/" + elem.song.id);
        });
    });
}
