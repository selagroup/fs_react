// export class MovieModel {
//     constructor(public id = 0, 
//                 public title='',
//                 public year=0,
//                 public poster ='',
//                 public releaseDate = null, 
//                 public genres=[]){

//     }
// }
// export interface MovieModel {
//     id:number, 
//     title:string,
//     year:number,
//     poster:string,
//     releaseDate?:Date, 
//     genres?: string[]
// }

export interface MovieModel {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: OriginalLanguage;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export enum OriginalLanguage {
    En = "en",
    Es = "es",
    Ko = "ko",
}
