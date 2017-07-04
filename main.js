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
	let currentSlide = 0;
	let slides = $(".slide");
	for (i = 0, j = 6; i < slides.length; i += 1, j -= 1) {
   $(slides[i]).css("z-index", j);
	}
	$(slides).hide();
	showSlides(slides, currentSlide);
	chooseAutoRotate(slides, currentSlide);
}

function chooseAutoRotate(slides, currentSlide) {
 	$("#autoRotate").click( function() {
		if ($("#autoRotate").is(":checked")) {
			autoRotateSlides(currentSlide, slides);
		} else if ($("#autoRotate").prop("checked") === false) {
			clearInterval(intervalId);
		}
	})
}

function showSlides(slides, currentSlide) {
	if (currentSlide === 0) {
		slides.eq(currentSlide).show();
	}
	$("#next").click(function() {
		if (currentSlide === slides.length - 1) {
			currentSlide = 0;
			slides.eq(currentSlide).show();
		} else {
			advance(slides, currentSlide);
			currentSlide += 1;
		}
	});
	$("#prev").click(function() {
		if (currentSlide === 0) {
			retreat(slides, currentSlide);
			currentSlide = slides.length - 1;
		} else {
			retreat(slides, currentSlide);
			currentSlide -= 1;
		}
	});
}

function autoRotateSlides(currentSlide, slides) {
	intervalId = setInterval(function() {
		if (currentSlide === 0) {
			advance(slides, currentSlide);
			currentSlide += 1;
		} else if (currentSlide === slides.length - 1) {
			slides.eq(currentSlide).hide();
			currentSlide = 0;
			slides.eq(currentSlide).show();
		} else {
			advance(slides, currentSlide);
			currentSlide += 1;
		}
	}, 2000);
}

function advance(slides, currentSlide) {
	slides.eq(currentSlide).hide();
	slides.eq(currentSlide + 1).show();
}
function retreat(slides, currentSlide) {
	slides.eq(currentSlide).hide();
	slides.eq(currentSlide - 1).show();
}