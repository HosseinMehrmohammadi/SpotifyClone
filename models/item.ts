import { Song } from "./song";

export interface Item {
    albumID: string,
    songs: Array<Song>
}
