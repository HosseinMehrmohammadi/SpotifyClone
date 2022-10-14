import { Album } from "../models/album";
import { Song } from "../models/song";
import * as resSvg from "../res/svg";
import { urlRoute } from "./routing";

export const getPlaylistData = (data: any, playlist: {album: Album, music: Song}[]) => {
    data.forEach((elem: { album: Album; musics: Song[]; }) => {
        elem.musics.forEach(m => {
            if (m.like_status == "like") {
                playlist.push({album: elem.album, music: m});
            }
        });
    });
}

export const loadPlaylist = (playlist: {album: Album, music: Song}[], ul: any) => {
    playlist.forEach(elem => {
        let tempLi = document.createElement("li");
        let tempImg = document.createElement("img");
        tempImg.classList.add("song-img-playlist");
        tempImg.src = elem.music.track_thumb;
        let tempdiv1 = document.createElement("div");
        tempdiv1.classList.add("elem-div1");
        let tempP = document.createElement("p");
        tempP.classList.add("song-title-playlist");
        tempP.innerText = elem.music.track_name;
        let tempdiv2 = document.createElement("div");
        tempdiv2.classList.add("elem-div2");
        let tempdiv3 = document.createElement("div");
        tempdiv3.innerHTML = resSvg.dw;
        let tempP2 = document.createElement("p");
        tempP2.classList.add("artists-playlist");
        tempP2.innerText = elem.album.album_composer;
        let tempdiv4 = document.createElement("div");
        tempdiv4.style.display = "flex";
        tempdiv4.innerHTML = resSvg.liked;
        let tempdiv5 = document.createElement("div");
        tempdiv5.style.display = "flex";
        tempdiv5.innerHTML = resSvg.more;

        tempdiv2.append(tempdiv3, tempP2);
        tempdiv1.append(tempP, tempdiv2);
        tempLi.append(tempImg, tempdiv1, tempdiv4, tempdiv5);
        ul?.appendChild(tempLi);

        tempP.addEventListener('click', () => {
            localStorage.setItem("current_album", JSON.stringify(elem.album));
            localStorage.setItem("current_music", JSON.stringify(elem.music));
            urlRoute("/library/albums/" + elem.album.id + "/" + elem.music.id);
        });
    });
}