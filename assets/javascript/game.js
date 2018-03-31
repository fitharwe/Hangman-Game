var wins = 0;
var losses = 0;


var currentword = document.getElementById("display-word");
var guesses = document.getElementById("guesses");
var remaining = document.getElementById("remaining-guesses");
var totalWins = document.getElementById("totalWins");
var totalLosses = document.getElementById("totalLosses");


var availableletters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

var pressAnyKeyToStart = [];
var pressAnyKeyToReset = [];
var youWin = [];
var youLose = [];
var emptyAlert = [];

var game = new Hangman();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (availableletters.includes(userGuess) && !game.guesses.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}

function Hangman() {
	this.wordList = [
        "SaintOlaf",
        "Miami",
        "Sicily",
        "Sophia",
        "Dorothy",
        "Blanche",
        "Rose",
        "Stanley",
        "Friend",
        ]

	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
	this.guesses = [];
	this.remainingchar = this.word.length;
	this.visibleLetters = [];
	this.gameOver = false;
	this.alertLines = emptyAlert;
	for (var i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

Hangman.prototype.checkGuess = function(char) {
	this.guesses.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i).toUpperCase () === char.toUpperCase()) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.remainingchar--;
	}

	if (this.remainingchar == 0) {
		losses++;
		this.alertLines = youLose;
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.alertLines = youWin;
		this.gameOver = true;
	}

	game.updatePageData();
};

Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	currentword.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guesses.length; i++) {
		tempString += (this.guesses[i].toUpperCase());
		if (i < (this.guesses.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guesses.textContent = tempString;

	tempString = this.remainingchar;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	remaining.textContent = "Guesses Remaining: " + tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	totalWins.textContent = "Wins " + tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	totalLosses.textContent = "Losses " + tempString;


}

game.updatePageData();