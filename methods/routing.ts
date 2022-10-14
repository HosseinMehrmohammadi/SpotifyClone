import { urlRoutes } from "../res/url";
import { Album } from "../models/album";
import { Song } from "../models/song";
import { Item } from "../models/item";
import { RecentSearch } from "../models/recentSearch";
import * as data from "../res/data.json";
import * as home from "./home";
import * as search from "./search";
import * as albumsPage from "./albums";
import * as artistsPage from "./artists";
import * as playlistsPage from "./playlists";
import * as songPage from "./song";
import * as albumPage from "./album";
import * as artistPage from "./artist";
import * as playlistPage from "./playlist";
import { audioPlayer } from "../source";



const goHome = () => {
    urlRoute("/home");
}

const goSearch = () => {
    urlRoute("/search");
}

const goLibrary = () => {
    urlRoute("/library/albums");
}

const goArtists = () => {
    urlRoute("/library/artists");
}

const goPlaylists = () => {
    urlRoute("/library/playlists");
}

export const urlRoute = (newRoute: string) => {
    window.history.pushState({}, "", newRoute);
    urlLocationHandler();
}

export const urlLocationHandler = async () => {
    let location = window.location.pathname;
    let rg_song = /\/library\/albums\/\d{6}\/\d{6}/;
    let rg_album = /\/library\/albums\/\d{6}/;

    let tempAlbums: Album[] = [];
    let tempMusics: Song[] = [];
    data.forEach(elem => {
        tempAlbums.push(elem.album);
        elem.musics.forEach(m => {
            tempMusics.push(m);
        });
    });

    let rg_artist = /\/library\/artists\//;

    if (location == "/index.html" || location == "/") {
        location = "/home";
        urlRoute("/home");
    }
    else if (location.match(rg_song)) {
        tempAlbums.forEach(a => {
            if (a.id == location.split("/")[3]) {
                localStorage.setItem("current_album", JSON.stringify(a));
            }
        });
        tempMusics.forEach(m => {
            if (m.id == location.split("/")[4]) {
                localStorage.setItem("current_music", JSON.stringify(m));
            }
        });
        location = "/library/albums/album/song";
    }
    else if (location.match(rg_album)) {
        tempAlbums.forEach(a => {
            if (a.id == location.split("/")[3]) {
                localStorage.setItem("current_album", JSON.stringify(a));
            }
        });
        location = "/library/albums/album";
    }
    else if (location.match(rg_artist)) {
        location = "/library/artists/artist";
    }

    const route = urlRoutes[location as keyof typeof urlRoutes];
    const html = await fetch(route.template).then((response) =>
    response.text());
    document.getElementById("pageContainer")!.innerHTML = html;
    loadPage(route.template);
}

const loadPage = (route: string) => {
    switch (route) {
        case "./home.html":
            let albums: Album[] = [];
            let musics: Item[] = [];
            let recPlayedList = document.getElementById("recPlayedList");
            let madeForYouList = document.getElementById("madeForYou");
            let recPlayed = JSON.parse(localStorage.getItem("recently_played") || "[]");
            let navSearch = document.getElementById("navSearch");
            let navLibrary = document.getElementById("navLibrary");

            navSearch?.addEventListener('click', goSearch);
            navLibrary?.addEventListener('click', goLibrary);
          
            home.getHomeData(data, albums, musics);
            home.loadrecPlayed(recPlayed, recPlayedList, albums);
            home.loadMadeForYou(madeForYouList, albums);
            break;

        case "./search.html":
            let searchbar = document.getElementById("searchbar") as HTMLInputElement;
            let datalist = document.getElementById("searchbarData");
            let searchIcon = document.getElementById("searchIcon");
            let cancelButton = document.getElementById("cancel");
            let ul = document.getElementById("recSearchList"); 
            
            let names: RecentSearch[] = [];
            let recentList: RecentSearch[] = JSON.parse(localStorage.getItem("music_searchedList") || "[]");

            let navHome1 = document.getElementById("navHome");
            let navLibrary1 = document.getElementById("navLibrary");

            navHome1?.addEventListener('click', goHome);
            navLibrary1?.addEventListener('click', goLibrary);

            search.getSearchData(data, names, datalist);
            search.laodRecentlySearched(recentList, data, ul);
            
            searchbar?.addEventListener('keyup', (event) => {
                if (event.key == 'Enter') {
                    search.search(names, searchbar, recentList);
                }
            });

            searchIcon?.addEventListener('click', () => {
                search.search(names, searchbar, recentList);
            });

            cancelButton?.addEventListener('click', () => {
                searchbar.value = "";
            });
            break;

        case "/albums.html":
            let searchbar1 = document.getElementById("albumsSearch") as HTMLInputElement;
            let datalist1 = document.getElementById("albumsData");
            let searchIcon1 = document.getElementById("searchIconAlbums");
            let filterButton = document.getElementById("filters");
            let ul1 = document.getElementById("albumsList");
            
            let albums1: Album[] = [];

            let navHome2 = document.getElementById("navHome");
            let navSearch2 = document.getElementById("navSearch");
            let navPlaylists2 = document.getElementById("navPlaylists");
            let navArtists2 = document.getElementById("navArtists");

            navHome2?.addEventListener('click', goHome);
            navSearch2?.addEventListener('click', goSearch);
            navPlaylists2?.addEventListener('click', goPlaylists);
            navArtists2?.addEventListener('click', goArtists);

            albumsPage.getAlbumsData(data, albums1, datalist1);
            albumsPage.loadAlbums(albums1, ul1);

            searchbar1?.addEventListener('keyup', (event) => {
                if (event.key == 'Enter') {
                    albumsPage.search(albums, searchbar);
                }
            });
            
            searchIcon1?.addEventListener('click', () => {
                albumsPage.search(albums, searchbar);
            });
            
            filterButton?.addEventListener('click', () => {
                albumsPage.search(albums, searchbar);
            });
            break;

        case "/artists.html": 
            let searchbar2 = document.getElementById("artistsSearch") as HTMLInputElement;
            let datalist2 = document.getElementById("artistsData");
            let searchIcon2 = document.getElementById("artistsSearchIcon");
            let filterButton2 = document.getElementById("filtersArtists");
            let ul2 = document.getElementById("artistsList");
            
            let artists: string[] = [];

            let navHome3 = document.getElementById("navHome");
            let navSearch3 = document.getElementById("navSearch");
            let navPlaylists3 = document.getElementById("navPlaylists");
            let navAlbums3 = document.getElementById("navAlbums");

            navHome3?.addEventListener('click', goHome);
            navSearch3?.addEventListener('click', goSearch);
            navPlaylists3?.addEventListener('click', goPlaylists);
            navAlbums3?.addEventListener('click', goLibrary);

            artistsPage.getArtistsData(data, artists, datalist2);
            artistsPage.loadArtists(artists, ul2);

            searchbar2?.addEventListener('keyup', (event) => {
                if (event.key == 'Enter') {
                    artistsPage.search(artists, searchbar2);
                }
            });
            
            searchIcon2?.addEventListener('click', () => {
                artistsPage.search(artists, searchbar2);
            });
            
            filterButton2?.addEventListener('click', () => {
                artistsPage.search(artists, searchbar2);
            });
            break;

        case "/playlists.html":
            let searchbar3 = document.getElementById("playlistsSearch") as HTMLInputElement;
            let searchIcon3 = document.getElementById("playlistsSearchIcon");
            let filterButton3 = document.getElementById("filtersPlaylists");
            let ul3 = document.getElementById("playlists");

            const artists3: Array<string> = [];

            let navHome4 = document.getElementById("navHome");
            let navSearch4 = document.getElementById("navSearch");
            let navArtists4 = document.getElementById("navArtists");
            let navAlbums4 = document.getElementById("navAlbums");

            navHome4?.addEventListener('click', goHome);
            navSearch4?.addEventListener('click', goSearch);
            navArtists4?.addEventListener('click', goArtists);
            navAlbums4?.addEventListener('click', goLibrary);

            playlistsPage.loadPlaylist(ul3);

            searchbar3?.addEventListener('keyup', (event) => {
                if (event.key == 'Enter') {
                    playlistsPage.search(artists3, searchbar3);
                }
            });
            
            searchIcon3?.addEventListener('click', () => {
                playlistsPage.search(artists3, searchbar3);
            });
            
            filterButton3?.addEventListener('click', () => {
                playlistsPage.search(artists3, searchbar3);
            });
            break;

        case "/song.html":
            let musicAlbumName = document.getElementById("musicAlbumName");
            let musicImg = document.getElementById("musicImg") as HTMLImageElement;
            let musicName = document.getElementById("musicName");
            let musicComposer = document.getElementById("musicComposer");
            let trackTime = document.getElementById("trackTime");

            let currentAlbum: Album = JSON.parse(localStorage.getItem("current_album") || "{}");
            let currentMusic: Song = JSON.parse(localStorage.getItem("current_music") || "{}");
            let recPlayed4 = JSON.parse(localStorage.getItem("recently_played") || "[]");

            songPage.loadSong(musicAlbumName, currentAlbum, musicImg, currentMusic, musicName, musicComposer, trackTime, recPlayed4, audioPlayer);
            
            break;
        
        case "/album.html":
            let albumImg = document.getElementById("albumImg") as HTMLImageElement;
            let albumName = document.getElementById("albumName");
            let composer = document.getElementById("albumComposer");
            let ul5 = document.getElementById("albumMusics");

            let currentAlbum5: Album = JSON.parse(localStorage.getItem("current_album") || "{}");

            let musics5: Song[] = [];

            let navHome5 = document.getElementById("navHome");
            let navSearch5 = document.getElementById("navSearch");
            let navLibrary5 = document.getElementById("navLibrary");

            navHome5?.addEventListener('click', goHome);
            navSearch5?.addEventListener('click', goSearch);
            navLibrary5?.addEventListener('click', goLibrary);

            albumPage.getAlbumData(data, currentAlbum5, musics5);
            albumPage.loadAlbum(albumImg, currentAlbum5, albumName, composer, musics5, ul5);
            break;

        case "/artist.html":
            let artistName = document.getElementById("artistName");
            let ul6 = document.getElementById("artistMusics");

            let currentArtist: string = JSON.parse(localStorage.getItem("currentArtist") || "");
            let musics6: {song: Song, id: string | number}[] = [];
            let albums6: Album[] = [];

            let navHome6 = document.getElementById("navHome");
            let navSearch6 = document.getElementById("navSearch");
            let navLibrary6 = document.getElementById("navLibrary");

            navHome6?.addEventListener('click', goHome);
            navSearch6?.addEventListener('click', goSearch);
            navLibrary6?.addEventListener('click', goLibrary);

            artistPage.getArtistData(data, currentArtist, musics6, albums6);
            artistPage.loadArtist(currentArtist, artistName, musics6, ul6, albums6);
            break;
        
        case "/playlist.html":
            let ul7 = document.getElementById("playlist");

            let playlist: {album: Album, music: Song}[] = [];

            let navHome7 = document.getElementById("navHome");
            let navSearch7 = document.getElementById("navSearch");
            let navLibrary7 = document.getElementById("navLibrary");

            navHome7?.addEventListener('click', goHome);
            navSearch7?.addEventListener('click', goSearch);
            navLibrary7?.addEventListener('click', goLibrary);

            playlistPage.getPlaylistData(data, playlist);
            playlistPage.loadPlaylist(playlist, ul7);
    }   
}
