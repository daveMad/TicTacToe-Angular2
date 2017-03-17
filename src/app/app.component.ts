import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  isTurnAi: boolean = false; selectedChoice: boolean = false;
  player = { score: 0, moves: [], weapon: '' };
  ai = { score: 0, moves: [], weapon: '' };

  possible = ['123', '456', '789', '147', '258', '369', '357', '159'];
  boxes = []; emptyBoxes = [];

  constructor(){
    this.init();
  }

  boxclick(n) {
    if (this.player.weapon === '') {
      alert('Please select either X or O before the game');
      return;
    }

    this.redefineEmptyBox(n);
    if (this.boxes[n].co === '') {

      if (!this.isTurnAi) {
        this.boxes[n].co = this.player.weapon;

        if (this.processTheMove(this.player.weapon) === true) { // Player won!
          this.player.score += 1;
          this.reset();
          return;
        }
        else {
          this.toggle();
        }
      }

      if (this.checkGameOver()) {
        alert('It was a draw!');
        this.reset();
      }
    } else {
      alert('That box is selected!');
    }
  }

  aiClick() {
    if (this.checkGameOver()) {
      alert('It was a draw!');
      this.reset();
      this.toggle();
      return;
    }

    var grid = this.emptyBoxes[this.getRandomInt(0, this.emptyBoxes.length)];
    this.redefineEmptyBox(grid);
    this.boxes[grid].co = this.ai.weapon;
    if (this.processTheMove(this.ai.weapon) === true) { // Ai won!
      this.ai.score += 1;
      this.reset();
      this.aiClick();
      //return;
    }
    else {
      this.toggle();
    }
  }


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  processTheMove(weapon) {
    for (var i = 0; i < this.possible.length; i++) {
      var element = this.possible[i].split('');
      var isOk = true;
      for (var j = 0; j < element.length; j++) { // current possibility : 1,2 & 3 etc.
        var innerElement = +element[j] - 1;
        if (this.boxes[innerElement].co !== weapon) {
          isOk = false;
        }

        if (isOk && j == element.length - 1) {
          alert(weapon + ' Wins! ');
          return true;
        }
      }
    }
    return false;
  }

  redefineEmptyBox(num) {
    this.emptyBoxes = this.emptyBoxes.filter(function (val) {
      return parseInt(val) !== parseInt(num);
    });
    console.log(this.emptyBoxes);
  }

  reset() {
    this.emptyBoxes = [];
    for (var i in this.boxes) {
      this.emptyBoxes.push(i);
      this.boxes[i].co = '';
    }
    this.player.moves = this.ai.moves = [];
  }

  checkGameOver() {
    var flag = true;
    for (var i in this.boxes) {
      if (this.boxes[i].co === '')
        flag = false;
    }
    return flag;
  }

  toggle() {
    this.isTurnAi = !this.isTurnAi;
    if (this.isTurnAi)
      this.aiClick();
  }

  setChoice(choice) {
    this.player.weapon = choice;
    this.selectedChoice = true;
    if (choice === 'X')
      this.ai.weapon = 'O';
    else
      this.ai.weapon = 'X';
  }

  init() {
    for (var i = 0; i < 9; i++) {
      this.boxes.push({ id: i, co: "" });
      this.emptyBoxes.push(i);
    }
  }


}
