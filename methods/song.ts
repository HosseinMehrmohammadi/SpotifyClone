import { biData, dbAction } from "./localDB";

const onlyUnique = (value: any, index: any, self: string | any[]) => {
    return self.indexOf(value) === index;
}

export const loadSong = async (musicAlbumName: any, currentAlbum: any, musicImg: any, currentMusic: any, musicName: any,
    musicComposer: any, trackTime: any, recPlayed: any, audioPlayer: any) => {

    musicAlbumName!.innerText = currentAlbum.album_name;
    musicImg!.src = currentMusic.track_thumb;
    musicName!.innerText = currentMusic.track_name;
    musicComposer!.innerText = currentAlbum.album_composer;
    trackTime!.innerText = currentMusic.track_time;

    recPlayed.push(currentAlbum.id)
    recPlayed = recPlayed.filter(onlyUnique);
    localStorage.setItem("recently_played", JSON.stringify(recPlayed));
    
    if (typeof currentMusic.id == "string") {
        dbAction(parseInt(currentMusic.id), "get");
    } else {    
        dbAction(currentMusic.id, "get");
    }
    if (biData == undefined) {
        audioPlayer.src = currentMusic.track_url;
        audioPlayer.play();
        let blob = await ( await fetch(currentMusic.track_url)).blob();
        if (typeof currentMusic.id == "string") {
            dbAction(parseInt(currentMusic.id), "put", blob);
        } else {
            dbAction(currentMusic.id, "put", blob);
        }
    } else {
        let file = new File([biData], "music.mp3");
        audioPlayer.src = URL.createObjectURL(file);
        audioPlayer.play();
    }
}
