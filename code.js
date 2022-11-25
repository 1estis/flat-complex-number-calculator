// Complex number calculator on the coordinate plane
// Using coordinates plane from the Desmos graphing calculator
// https://www.desmos.com/calculator

var elt = document.getElementById('calculator'); // Div element
var calculator = Desmos.GraphingCalculator(elt, {keypad: false, expressions: true});

// Resize the div element to fit the screen
elt.style.width = window.innerWidth + 'px';
elt.style.height = window.innerHeight + 'px';

// Resize the calculator when the window is resized
window.onresize = function() {
  elt.style.width = window.innerWidth + 'px';
  elt.style.height = window.innerHeight + 'px';
};

// List of complex numbers
var complexNumbers = [];

// Complex number class
class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    // Add two complex numbers
    add(complex) {
        return new Complex(this.real + complex.real, this.imaginary + complex.imaginary);
    }

    // Subtract two complex numbers
    subtract(complex) {
        return new Complex(this.real - complex.real, this.imaginary - complex.imaginary);
    }

    // Multiply two complex numbers
    multiply(complex) {
        return new Complex(this.real * complex.real - this.imaginary * complex.imaginary, this.real * complex.imaginary + this.imaginary * complex.real);
    }

    // Divide two complex numbers
    divide(complex) {
        return new Complex((this.real * complex.real + this.imaginary * complex.imaginary) / (complex.real * complex.real + complex.imaginary * complex.imaginary), (this.imaginary * complex.real - this.real * complex.imaginary) / (complex.real * complex.real + complex.imaginary * complex.imaginary));
    }

    // Get the absolute value of a complex number
    abs() {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }

    // Get the argument of a complex number
    arg() {
        return Math.atan2(this.imaginary, this.real);
    }

    // Get the conjugate of a complex number
    conjugate() {
        return new Complex(this.real, -this.imaginary);
    }

    // Get the reciprocal of a complex number
    reciprocal() {
        return new Complex(this.real / (this.real * this.real + this.imaginary * this.imaginary), -this.imaginary / (this.real * this.real + this.imaginary * this.imaginary));
    }

    // Get the real part of a complex number
    getReal() {
        return this.real;
    }

    // Get the imaginary part of a complex number
    getImaginary() {
        return this.imaginary;
    }

    // Get the polar form of a complex number
    getPolar() {
        return new Complex(this.abs(), this.arg());
    }

    // Get the exponential form of a complex number
    getExponential() {
        return new Complex(Math.exp(this.real) * Math.cos(this.imaginary), Math.exp(this.real) * Math.sin(this.imaginary));
    }

    // Get the string representation of a complex number
    toString() {
        if (this.imaginary == 0) {
            return this.real.toString();
        } else if (this.real == 0) {
            return this.imaginary.toString() + 'i';
        } else if (this.imaginary > 0) {
            return this.real.toString() + ' + ' + this.imaginary.toString() + 'i';
        } else {
            return this.real.toString() + ' - ' + (-this.imaginary).toString() + 'i';
        }
    }
}

const elt_onclick_default = elt.onclick === 'function' ? elt.onclick : function() {};

// On click, add a point to the graph
elt.onclick = function(e) {
    elt_onclick_default(e);
    // Get the coordinates of the click
    var {x, y} = calculator.pixelsToMath({x: e.clientX, y: e.clientY});

    // On click on a point, draw a circle around it
    for (var i = 0; i < complexNumbers.length; i++) {
        if (Math.abs(complexNumbers[i].getReal() - x) < 0.1 && Math.abs(complexNumbers[i].getImaginary() - y) < 0.1) {
            // Draw a circle around the point
            // Define the circle as expression (x - a)^2 + (y - b)^2 = r^2
            calculator.setExpression({id: 'circle', latex: '(x - ' + x + ')^2 + (y - ' + y + ')^2 = 0.1^2', color: Desmos.Colors.RED});
            return;
        }
    }

    // Add the point to the graph
    var complex = new Complex(x, y);
    complexNumbers.push(complex);
    calculator.setExpression({id: 'point' + complex.toString(), latex: '(' + x + ', ' + y + ')', color: '#000000', hidden: false});
};