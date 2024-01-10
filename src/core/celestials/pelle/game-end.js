export const END_STATE_MARKERS = {
  // Tab zalgoification starts as soon as endState > 0
  GAME_END: 1,
  TAB_START_HIDE: 1.5,
  INTERACTIVITY_DISABLED: 2.5,
  FADE_AWAY: 2.5,
  SAVE_DISABLED: 4, //WILL KEEP SAVE ENABLED FOR MENDING AND BEYOND
  END_NUMBERS: 4.2,
  DISPLAY_DESTROYER_QUOTES: 4.5,
  CREDITS_START: 4.5, //WILL DISABLE CREDITS ROLL FOR NOW, UNLESS I CAN HAVE TWO SEPERATE SETS OF CREDITS
  SHOW_NEW_GAME: 13, //WE'RE NOT DONE YET, YOU STILL HAVE ANOTHER LAYER TO GO THROUGH
  SPECTATE_GAME: 13.5, //*SEE ABOVE*
  CREDITS_END: 14.5, //UNNEEDED (FOR NOW) DUE TO "CREDITS_START" BEING DISABLED
};

export const GameEnd = {
  get endState() {
    if (this.removeAdditionalEnd) return this.additionalEnd;
    return Math.max((Math.log10(player.celestials.pelle.records.totalAntimatter.plus(1).log10() + 1) - 8.7) /
      (Math.log10(9e15) - 8.7) + this.additionalEnd, 0);
  },

  _additionalEnd: 0,
  get additionalEnd() {
    return (player.isGameEnd || this.removeAdditionalEnd) ? this._additionalEnd : 0;
  },
  set additionalEnd(x) {
    this._additionalEnd = (player.isGameEnd || this.removeAdditionalEnd) ? x : 0;
  },

  removeAdditionalEnd: false,

  creditsClosed: false,
  creditsEverClosed: false,

  gameLoop(diff) {
    if (this.removeAdditionalEnd) {
      this.additionalEnd -= Math.min(diff / 200, 0.5);
      if (this.additionalEnd < 4) {
        this.additionalEnd = 0;
        this.removeAdditionalEnd = false;
      }
    }
    if (!this.removeAdditionalEnd && this.endState >= END_STATE_MARKERS.GAME_END &&
        ui.$viewModel.modal.progressBar === undefined) {
      player.isGameEnd = true;
      if(this.endState < 4.5){
        if(player.mends.gte(new Decimal(10))){
          this.additionalEnd += Math.min(diff / 1000 / 20, 0.1) * 15;
        }
        else{
          this.additionalEnd += Math.min(diff / 1000 / 20, 0.1);
        }
      }
      else{
        this.additionalEnd += Math.min(diff / 1000 / 20, 0.1) * 200;
        /*if(this.endState >= 14.5){
          Quotes.destroyer.preMend.show()
        }*/
      }
    }
  }
};