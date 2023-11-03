// Select the canvas element using its id
var canvas = document.getElementById('myCanvas');

// Create a new 2D drawing context
var context = canvas.getContext('2d');

// Create a new gradient color for the canvas background
var gradient = context.createLinearGradient(0, 0, 170, 0);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'green');

// Fill the canvas background with the gradient color
context.fillStyle = gradient;
context.fillRect(0, 0, 300, 150);

// Add more code here to draw your desired square containing dynamic text