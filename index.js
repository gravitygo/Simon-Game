var combo = [];
var clicked;
var amountClick = 0;
var start = false;
$(document).keypress(function(event){
	if(!start){
		start=true;
		nextRound();
	}
});


$(".btn").click(
	function(event) {
		if (start) {
			event.target.classList.add("pressed");
			setTimeout(
				function() {
					event.target.classList.remove("pressed");
				}, 100);

			if (switcher(event.target.id) == combo[amountClick]) {
				amountClick++;
				if (amountClick >= combo.length) {
					amountClick = 0;
					nextRound();
				}
			} else {
				combo = [];
				amountClick = 0;
				$("body").addClass("game-over");
				sounds("wrong");
				setTimeout(
					function() {
						$("body").removeClass("game-over")
					}, 100);
				$("#level-title").text("Game Over, Press Any Key to Restart");
				start=false;
			}
		}
	}
);

function switcher(target) {
	switch (target) {
		case "green":
			clicked = 0;
			sounds(target);
			break;
		case "red":
			clicked = 1;
			sounds(target);
			break;
		case "yellow":
			clicked = 2;
			sounds(target);
			break;
		case "blue":
			clicked = 3;
			sounds(target);
			break;
	}
	return clicked;
}

function sounds(path) {
	var audio = new Audio("sounds/" + path + ".mp3");
	audio.play();
}

function nextRound() {
	var target = Math.floor(Math.random() * 4);
	combo.push(target);
	var color;
	switch (target) {
		case 0:
			color = "green";
			break;
		case 1:
			color = "red";
			break;
		case 2:
			color = "yellow";
			break;
		case 3:
			color = "blue";
			break;
	}
	$("#level-title").text("Level "+combo.length);
	setTimeout(
		function() {
			sounds(color);
			$("." + color).addClass("active");
			setTimeout(
				function() {
					$("." + color).removeClass("active");

				}, 300);
		}, 500);
}