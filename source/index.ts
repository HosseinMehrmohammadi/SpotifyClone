import { urlLocationHandler } from "../methods/routing";
export const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;

window.onpopstate = urlLocationHandler;
urlLocationHandler();
