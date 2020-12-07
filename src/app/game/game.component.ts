import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GameService } from '../shared/game.service'
import { Game } from '../shared/game.model'

declare var M: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService]
})
export class GameComponent implements OnInit {

  constructor(public gameService : GameService) { }


  ngOnInit(): void {
    this.resetForm();
    this.refreshGameList();
  }

  resetForm(form?: NgForm) {
    console.log("function call");
    if(form)
      form.reset();
    this.gameService.selectedGame = {
      _id: "",
      school1: "",
      school2: "",
      game: "",
      date: null
    }
  }

  onSubmit(form?: NgForm) {
    //the "value"? and object of Game
    if(form.value._id == ""){
      this.gameService.postGame(form.value).subscribe((res) =>{
        //response from nodejs project
        this.resetForm(form);
        this.refreshGameList();
        M.toast({ html: 'Game added', classes: 'rounded'});
      });
    } else {
      this.gameService.patchGame(form.value).subscribe((res) =>{
        //response from nodejs project
        this.resetForm(form);
        this.refreshGameList();
        M.toast({ html: 'Game added', classes: 'rounded'});
      });
    }
    

  }

  refreshGameList() {
    this.gameService.getGameList().subscribe((res) => {
      //we must CAST response AS an array of games
      this.gameService.games = res as Game[];
    })
  }

  onEdit(game: Game) {
    //update form with selected game
    this.gameService.selectedGame = game;
    //we have a patch right?
  }

  onDelete(_id: String, form: NgForm) {
    //update form with selected game
    if(confirm('Are you sure you want to delete this game ?') == true) {
      this.gameService.deleteGame(_id).subscribe((res) => {
        this.refreshGameList();
        this.resetForm(form);
        M.toast({ html: 'Deleted succesfully', classes: 'rounded'});

      })
    }
    //we have a patch right?
    //loss of data means we have to confirm the operation from clientside

  }

}
