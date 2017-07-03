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
	// $(slides).addClass("hidden");
	showSlides(slides);
}

function showSlides(slides) {
	let counter = 0;
	if (counter === 0) {
		slides.eq(counter).fadeIn();
	}
	autoRotateSlides(counter, slides);
	$("#next").click(function() {
		if (counter === slides.length - 1) {
			counter = 0;
			slides.eq(counter).fadeIn();
		} else {
			slides.eq(counter).fadeOut();
			slides.eq(counter + 1).fadeIn();
			counter += 1;
		}
	});
	$("#prev").click(function() {
		if (counter === 0) {
			slides.eq(counter).fadeOut();
			slides.eq(slides.length - 1).fadeIn();
			counter = slides.length - 1;
		} else {
			slides.eq(counter).fadeOut();
			slides.eq(counter - 1).fadeIn();
			counter -= 1;
		}
	});
}

function autoRotateSlides(counter, slides) {
	setInterval(function() {
		if (counter === 0) {
			slides.eq(counter).fadeOut();
			slides.eq(counter + 1).fadeIn();
			counter += 1;
		} else if (counter === slides.length - 1) {
			slides.eq(counter).fadeOut();
			counter = 0;
			slides.eq(counter).fadeIn();
		} else {
			slides.eq(counter).fadeOut();
			slides.eq(counter + 1).fadeIn();
			counter += 1;
		}
	}, 3000);
}