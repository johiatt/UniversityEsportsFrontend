import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Game } from './game.model'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  selectedGame: Game; //perform operations on selected
  games: Game[];      //store all games in array
  readonly baseURL = 'https://university-esports-backend.herokuapp.com/games'; //this can just be nodejs link
  constructor(private http : HttpClient) { }

  postGame(game: Game) {
    //use http client to request from nodejs

    //game is already json?
    return this.http.post(this.baseURL, game)
  }

  getGameList(){
    
    return this.http.get(this.baseURL);
  }

  patchGame(game: Game) {
    return this.http.patch(this.baseURL + `/${game._id}`, game);
    //what are the ` vs '
  }

  deleteGame(_id: String) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
