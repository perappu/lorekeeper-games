
const cards = [
	{ x: -110, y: 0, winner: false },
	{ x: 0, y: 0, winner: false },
	{ x: 110, y: 0, winner: false }
];

const cardElements = [...document.getElementsByClassName("card")];

var winner = 0;

const delay = ms => new Promise(res => setTimeout(res, ms));
const getRandomInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; }

$(".card").css('background-image', 'url(' + gameDirectory + '/files/img/shell.png');
resetPosition();

const shuffleCards = async () => {

	$("#startButton").attr("onclick", "");
	$("#startButton").removeClass("btn-primary");
	$("#startButton").addClass("btn-secondary");
	$("#startButton").html("Shuffling...");

	winner = getRandomInt(0, 2);
	cards[winner]["winner"] = true;

	$('#' + winner).css('background-image', 'url(' + gameDirectory + '/files/img/shellball.png');
	await delay(2000);
	$(".card").css('background-image', 'url(' + gameDirectory + '/files/img/shell.png');

	if (!$("#disableAnimations").is(':checked')) {

		resetPosition();

		for (let i = 0; i < getRandomInt(5, 8); i++) {
			
			var cardElement = document.getElementById(getRandomInt(0, 2));
			var cardElementToSwap = document.getElementById(getRandomInt(0, 2));
			
			if (cardElement != cardElementToSwap) {
			
				cardElement.style.top = (cardElement.offsetTop - 50) + 'px';
				cardElementToSwap.style.top = (cardElementToSwap.offsetTop - 50) + 'px';
				
				await delay(1000);
				
				swapPosition(cardElement, cardElementToSwap);
				
				await delay(1000);

				cardElement.style.top = (cardElement.offsetTop + 50) + 'px';
				cardElementToSwap.style.top = (cardElementToSwap.offsetTop + 50) + 'px';
				
				await delay(1000);
				
			}
		}

	} else {
		cards.forEach((card) => card["winner"] = false);
		winner = getRandomInt(0, 2);
		cards[winner]["winner"] = true;
		cardElements.forEach((cardElement) => cardElement.onclick = isWinner);
	}

	$("#startButton").html("Guess!");

}

function resetPosition() {
	$('.card').each(function (i, obj) {
		$(this).css('left', cards[i]["x"]);
		$(this).css('top', cards[i]["y"]);
	});

}

function swapPosition(element1, element2) {
	
	var element1left = element1.style.left;
	var element1top = element1.style.top;
	var element2left = element2.style.left;
	var element2top = element2.style.top;

	element1.style.left = element2left;
	element1.style.top = element2top;
	element2.style.left = element1left;
	element2.style.top = element1top;

}

function isWinner() {

	if (cards[this.id]["winner"] == true) {
		$(this).css('background-image', 'url(' + gameDirectory + '/files/img/shellball.png');
		$("#text").html("You win!");
		
		$("#startButton").removeClass("btn-primary");
		$("#startButton").addClass("btn-success");
		$("#startButton").html("Submit Win");
		$("#startButton").attr("onclick", "submitScore(1);");
		
	}
	else {
		$("#text").html("Better luck next time!");
		$('#' + winner).css('background-image', 'url(' + gameDirectory + '/files/img/shellball.png');
		cards.forEach((card) => card["winner"] = false);
		$("#startButton").html("Play Again?");
		$("#startButton").attr("onclick", "location.reload();");
	}

}

function submitScore(score) {
	submit_score(score);
	location.reload();
}

function startGame() {
	$("#text").html("<br>");
	$(".card").css('transition', 'all 1s ease');

	cards.forEach((card) => card["winner"] = false);

	cardElements.forEach((cardElement) => cardElement.onclick = isWinner);

	shuffleCards();
}