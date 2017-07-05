"use strict";

let imagesArr = [];
let intervalId = null;

$(document).ready( function(){
	$.ajax({
		url: "images.json",
	}).done( function(slides){
		imagesArr.push(slides);
		makeSlides(slides);
	});
})

function makeSlides() {
	for (let i=0; i<imagesArr[0].slides.length; i++) {
		$("#imageDisplay").append(
		`<div class="slide">
			<h1>${imagesArr[0].slides[i].name}</h1>
			<div class="row">
				<div class="col-sm-4">
					<img src="${imagesArr[0].slides[i].img}">
				</div>
				<div class="col-sm-8">
					<p>${imagesArr[0].slides[i].caption}</p>
					<a href="${imagesArr[0].slides[i].source}" target="_blank">Learn More Here</a>
				</div>
			</div>
		</div>`
		)
	}
	orderSlides();
}

function orderSlides() {
	let i;
	let j;
	let counter = 0;
	let slides = $(".slide");
	for (i = 0, j = 6; i < slides.length; i += 1, j -= 1) {
   $(slides[i]).css("z-index", j);
	}
	$(slides).hide();
	showSlides(slides, counter);
	chooseAutoRotate(slides, counter);
}

function chooseAutoRotate(slides, counter) {
 	$("#autoRotate").click( function() {
		if ($("#autoRotate").is(":checked")) {
			autoRotateSlides(counter, slides);
		} else if ($("#autoRotate").prop("checked") === false) {
			clearInterval(intervalId);
			// counter = 0;
			// slides.eq(counter).fadeIn();
		}
	})
}

function showSlides(slides, counter) {
	if (counter === 0) {
		slides.eq(counter).fadeIn();
	}
	$("#next").click(function() {
		if (counter === slides.length - 1) {
			counter = 0;
			slides.eq(counter).fadeIn();
		} else {
			advance(slides, counter);
			counter += 1;
		}
	});
	$("#prev").click(function() {
		if (counter === 0) {
			retreat(slides, counter);
			counter = slides.length - 1;
		} else {
			retreat(slides, counter);
			counter -= 1;
		}
	});
}

function autoRotateSlides(counter, slides) {
	intervalId = setInterval(function() {
		if (counter === 0) {
			advance(slides, counter);
			counter += 1;
		} else if (counter === slides.length - 1) {
			slides.eq(counter).fadeOut();
			counter = 0;
			slides.eq(counter).fadeIn();
		} else {
			advance(slides, counter);
			counter += 1;
		}
	}, 2000);
}

function advance(slides, counter) {
	slides.eq(counter).fadeOut();
	slides.eq(counter + 1).fadeIn();
}
function retreat(slides, counter) {
	slides.eq(counter).fadeOut();
	slides.eq(counter - 1).fadeIn();
}