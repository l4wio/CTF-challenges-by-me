var email = document.querySelector('#title'), password = document.querySelector('#pad'), mySVG = document.querySelector('.svgContainer'), armL = document.querySelector('.armL'), armR = document.querySelector('.armR'), eyeL = document.querySelector('.eyeL'), eyeR = document.querySelector('.eyeR'), nose = document.querySelector('.nose'), mouth = document.querySelector('.mouth'), mouthBG = document.querySelector('.mouthBG'), mouthSmallBG = document.querySelector('.mouthSmallBG'), mouthMediumBG = document.querySelector('.mouthMediumBG'), mouthLargeBG = document.querySelector('.mouthLargeBG'), mouthMaskPath = document.querySelector('#mouthMaskPath'), mouthOutline = document.querySelector('.mouthOutline'), tooth = document.querySelector('.tooth'), tongue = document.querySelector('.tongue'), chin = document.querySelector('.chin'), face = document.querySelector('.face'), eyebrow = document.querySelector('.eyebrow'), outerEarL = document.querySelector('.earL .outerEar'), outerEarR = document.querySelector('.earR .outerEar'), earHairL = document.querySelector('.earL .earHair'), earHairR = document.querySelector('.earR .earHair'), hair = document.querySelector('.hair');
var caretPos, curEmailIndex, screenCenter, svgCoords, eyeMaxHorizD = 20, eyeMaxVertD = 10, noseMaxHorizD = 23, noseMaxVertD = 10, dFromC, eyeDistH, eyeLDistV, eyeRDistV, eyeDistR, mouthStatus = "small";

function getCoord(e) {
	var 	carPos = email.selectionEnd,
		div = document.createElement('div'),
		span = document.createElement('span'),
		copyStyle = getComputedStyle(email),
		emailCoords = {}, caretCoords = {}, centerCoords = {}
	;
	[].forEach.call(copyStyle, function(prop){
		div.style[prop] = copyStyle[prop];
	});
	div.style.position = 'absolute';
	document.body.appendChild(div);
	div.textContent = email.value.substr(0, carPos);
	span.textContent = email.value.substr(carPos) || '.';
	div.appendChild(span);
	
	emailCoords = getPosition(email);							//console.log("emailCoords.x: " + emailCoords.x + ", emailCoords.y: " + emailCoords.y);
	caretCoords = getPosition(span);							//console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
	centerCoords = getPosition(mySVG);							//console.log("centerCoords.x: " + centerCoords.x);
	svgCoords = getPosition(mySVG);
	screenCenter = centerCoords.x + (mySVG.offsetWidth / 2);		//console.log("screenCenter: " + screenCenter);
	caretPos = caretCoords.x + emailCoords.x;					//console.log("caretPos: " + caretPos);
	
	dFromC = screenCenter - caretPos; 							//console.log("dFromC: " + dFromC);
	var pFromC = Math.round((caretPos / screenCenter) * 100) / 100;
	if(pFromC < 1) {
		
	} else if(pFromC > 1) {
		pFromC -= 2;
		pFromC = Math.abs(pFromC);
	}

	eyeDistH = -dFromC * .05;
	if(eyeDistH > eyeMaxHorizD) {
		eyeDistH = eyeMaxHorizD;
	} else if(eyeDistH < -eyeMaxHorizD) {
		eyeDistH = -eyeMaxHorizD;
	}
	
	var eyeLCoords = {x: svgCoords.x + 84, y: svgCoords.y + 76};
	var eyeRCoords = {x: svgCoords.x + 113, y: svgCoords.y + 76};
	var noseCoords = {x: svgCoords.x + 97, y: svgCoords.y + 81};
	var mouthCoords = {x: svgCoords.x + 100, y: svgCoords.y + 100};
	var eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
	var eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
	var eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
	var eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
	var eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
	var eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
	var noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
	var noseX = Math.cos(noseAngle) * noseMaxHorizD;
	var noseY = Math.sin(noseAngle) * noseMaxVertD;
	var mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
	var mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
	var mouthY = Math.sin(mouthAngle) * noseMaxVertD;
	var mouthR = Math.cos(mouthAngle) * 6;
	var chinX = mouthX * .8;
	var chinY = mouthY * .5;
	var chinS = 1 - ((dFromC * .15) / 100);
	if(chinS > 1) {chinS = 1 - (chinS - 1);}
	var faceX = mouthX * .3;
	var faceY = mouthY * .4;
	var faceSkew = Math.cos(mouthAngle) * 5;
	var eyebrowSkew = Math.cos(mouthAngle) * 25;
	var outerEarX = Math.cos(mouthAngle) * 4;
	var outerEarY = Math.cos(mouthAngle) * 5;
	var hairX = Math.cos(mouthAngle) * 6;
	var hairS = 1.2;
	
	TweenMax.to(eyeL, 1, {x: -eyeLX , y: -eyeLY, ease: Expo.easeOut});
	TweenMax.to(eyeR, 1, {x: -eyeRX , y: -eyeRY, ease: Expo.easeOut});
	TweenMax.to(nose, 1, {x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut});
	TweenMax.to(mouth, 1, {x: -mouthX , y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut});
	TweenMax.to(chin, 1, {x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut});
	TweenMax.to(face, 1, {x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: Expo.easeOut});
	TweenMax.to(eyebrow, 1, {x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: Expo.easeOut});
	TweenMax.to(outerEarL, 1, {x: outerEarX, y: -outerEarY, ease: Expo.easeOut});
	TweenMax.to(outerEarR, 1, {x: outerEarX, y: outerEarY, ease: Expo.easeOut});
	TweenMax.to(earHairL, 1, {x: -outerEarX, y: -outerEarY, ease: Expo.easeOut});
	TweenMax.to(earHairR, 1, {x: -outerEarX, y: outerEarY, ease: Expo.easeOut});
	TweenMax.to(hair, 1, {x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: Expo.easeOut});
	
	document.body.removeChild(div);
};

function onEmailInput(e) {
	getCoord(e);
	var value = e.target.value;
	curEmailIndex = value.length;
	
	// very crude email validation for now to trigger effects
	if(curEmailIndex > 0) {
		if(mouthStatus == "small") {
			mouthStatus = "medium";
			TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut});
			TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
			TweenMax.to(tongue, 1, {x: 0, y: 1, ease: Expo.easeOut});
			TweenMax.to([eyeL, eyeR], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
		}
		if(value.includes("@")) {
			mouthStatus = "large";
			TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthLargeBG, ease: Expo.easeOut});
			TweenMax.to(tooth, 1, {x: 3, y: -2, ease: Expo.easeOut});
			TweenMax.to(tongue, 1, {y: 2, ease: Expo.easeOut});
			TweenMax.to([eyeL, eyeR], 1, {scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: "center center"});
		} else {
			mouthStatus = "medium";
			TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthMediumBG, ease: Expo.easeOut});
			TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
			TweenMax.to(tongue, 1, {x: 0, y: 1, ease: Expo.easeOut});
			TweenMax.to([eyeL, eyeR], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
		}
	} else {
		mouthStatus = "small";
		TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {morphSVG: mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut});
		TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
		TweenMax.to(tongue, 1, {y: 0, ease: Expo.easeOut});
		TweenMax.to([eyeL, eyeR], 1, {scaleX: 1, scaleY: 1, ease: Expo.easeOut});
	}
}

function onEmailFocus(e) {
	e.target.parentElement.classList.add("focusWithText");
	getCoord();
}

function onEmailBlur(e) {
	if(e.target.value == "") {
		e.target.parentElement.classList.remove("focusWithText");
	}
	resetFace();
}

function onPasswordFocus(e) {
	coverEyes();
}

function onPasswordBlur(e) {
	uncoverEyes();
}

function coverEyes() {
	TweenMax.to(armL, .45, {x: -93, y: 2, rotation: 0, ease: Quad.easeOut});
	TweenMax.to(armR, .45, {x: -93, y: 2, rotation: 0, ease: Quad.easeOut, delay: .1});
}

function uncoverEyes() {
	TweenMax.to(armL, 1.35, {y: 220, ease: Quad.easeOut});
	TweenMax.to(armL, 1.35, {rotation: 105, ease: Quad.easeOut, delay: .1});
	TweenMax.to(armR, 1.35, {y: 220, ease: Quad.easeOut});
	TweenMax.to(armR, 1.35, {rotation: -105, ease: Quad.easeOut, delay: .1});
}

function resetFace() {
	TweenMax.to([eyeL, eyeR], 1, {x: 0, y: 0, ease: Expo.easeOut});
	TweenMax.to(nose, 1, {x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut});
	TweenMax.to(mouth, 1, {x: 0, y: 0, rotation: 0, ease: Expo.easeOut});
	TweenMax.to(chin, 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
	TweenMax.to([face, eyebrow], 1, {x: 0, y: 0, skewX: 0, ease: Expo.easeOut});
	TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
}

function getAngle(x1, y1, x2, y2) {
	var angle = Math.atan2(y1 - y2, x1 - x2);
	return angle;
}

function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}

email.addEventListener('focus', onEmailFocus);
email.addEventListener('blur', onEmailBlur);
email.addEventListener('input', onEmailInput);
password.addEventListener('focus', onPasswordFocus);
password.addEventListener('blur', onPasswordBlur);
TweenMax.set(armL, {x: -93, y: 220, rotation: 105, transformOrigin: "top left"});
TweenMax.set(armR, {x: -93, y: 220, rotation: -105, transformOrigin: "top right"});


;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));