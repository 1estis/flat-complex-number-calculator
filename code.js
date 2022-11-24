// Complex number calculator on the coordinate plane
// Using coordinates plane from the Desmos graphing calculator
// https://www.desmos.com/calculator

var elt = document.getElementById('calculator'); // Div element
var calculator = Desmos.GraphingCalculator(elt, {keypad: false, expressions: false});

// Resize the div element to fit the screen
elt.style.width = window.innerWidth + 'px';
elt.style.height = window.innerHeight + 'px';

// Resize the calculator when the window is resized
window.onresize = function() {
  elt.style.width = window.innerWidth + 'px';
  elt.style.height = window.innerHeight + 'px';
};

