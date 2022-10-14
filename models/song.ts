export interface Song {
    id: number | string,
    track_name: string,
    track_time: string,
    track_url: string,
    track_thumb: string,
    is_favorited: number,
    like_status: string | boolean,
    nonce: string
}
