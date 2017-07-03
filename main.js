"use strict";

let imagesArr = [];

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
	let slides = $(".slide");
	for (i = 0, j = 6; i < slides.length; i += 1, j -= 1) {
   $(slides[i]).css("z-index", j);
	}
	showSlides(slides);
}

function showSlides(slides) {
	let currentSlide = 0;
	if (currentSlide === 0) {
		slides.eq(currentSlide).fadeIn("slow");
	}
	// autoRotateSlides(currentSlide, slides);
	$("#next").click(function() {
		if (currentSlide === slides.length - 1) {
			currentSlide = 0;
			slides.eq(currentSlide).fadeIn("slow");
		} else {
			slides.eq(currentSlide).fadeOut("slow");
			slides.eq(currentSlide + 1).fadeIn("slow");
			currentSlide += 1;
		}
	});
	$("#prev").click(function() {
		if (currentSlide === 0) {
			slides.eq(currentSlide).fadeOut("slow");
			slides.eq(slides.length - 1).fadeIn("slow");
			currentSlide = slides.length - 1;
		} else {
			slides.eq(currentSlide).fadeOut("slow");
			slides.eq(currentSlide - 1).fadeIn("slow");
			currentSlide -= 1;
		}
	});
}


// function autoRotateSlides(currentSlide, slides) {
// 	setInterval(function() {
// 		if (currentSlide === 0) {
// 			slides.eq(currentSlide).fadeOut("slow");
// 			slides.eq(currentSlide + 1).fadeIn("slow");
// 			currentSlide += 1;
// 		} else if (currentSlide === slides.length - 1) {
// 			slides.eq(currentSlide).fadeOut("slow");
// 			currentSlide = 0;
// 			slides.eq(currentSlide).fadeIn("slow");
// 		} else {
// 			slides.eq(currentSlide).fadeOut("slow");
// 			slides.eq(currentSlide + 1).fadeIn("slow");
// 			currentSlide += 1;
// 		}
// 	}, 3000);
// }