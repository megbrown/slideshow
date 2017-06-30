let imagesArr = [];

function getImages(){
	var month = Math.floor(Math.random() * (9 - 1 + 1) + 1);
	var day = Math.floor(Math.random() * (28 - 10 + 1) + 10);
	var theUrl = `https://api.nasa.gov/planetary/apod?date=1999-0${month}-${day}&api_key=SWzilh00I6U3oFtWoaAMvioWX0mLOIh7ikpIw3nb`;
	$.ajax({
	  url: theUrl,
	}).done( function(images){
		imagesArr.push(images);
		$(imageDisplay).append(
			`<div class="image">
			<img src="${images.url}">
			<div class="caption">${images.explanation}</div>
			</div>`
			)
	});
}

$(document).ready(function() {
	getImages();
	getImages();
	getImages();
});

// function fadeImages() {
// 	for(i=0; i<imagesArr.length; i++) {
// 		$("#rightArrow").click( function(){
// 			imagesArr[i].fadeOut();
// 			imagesArr[i+1].fadeIn();
// 	})
// };

// $("#rightArrow").click( function(){
// 	$("#secondImage").fadeOut();
// 	$("#firstImage").fadeIn();
// });

// $("#leftArrow").click( function(){
// 	$("#firstImage").fadeOut();
// 	$("#secondImage").fadeIn();
// });
