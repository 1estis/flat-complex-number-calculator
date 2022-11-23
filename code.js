const grid_size_default = 35;
const scale_step = 0.1;
const grid_size_step = 0.5;
var x_axis_starting_point = { number: 1, suffix: '' };
var y_axis_starting_point = { number: 1, suffix: '' };

var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

var scale = 1;
var grid_number_scale = 1;
var grid_size = grid_size_default * scale;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// Resize the canvas
function resize_canvas() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    draw_grid();
}

// Resize the grid
function resize_grid() {
    grid_size = grid_size_default * scale;
    draw_grid();
}

// Draw the grid
function draw_grid() {

  var canvas_width = canvas.clientWidth;
  var canvas_height = canvas.clientHeight;

  var num_lines_x = Math.floor(canvas_height/grid_size);
  var num_lines_y = Math.floor(canvas_width/grid_size);
  var x_axis_distance_grid_lines = Math.floor(num_lines_x/2);
  var y_axis_distance_grid_lines = Math.floor(num_lines_y/2);

  // Draw grid lines along X-axis
  for(var i=0; i<=num_lines_x; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;

      // If line represents X-axis draw in different color
      if(i == x_axis_distance_grid_lines)
          ctx.strokeStyle = "#000000";
      else
          ctx.strokeStyle = "#c0c0c0";

      if(i == num_lines_x) {
          ctx.moveTo(0, grid_size*i);
          ctx.lineTo(canvas_width, grid_size*i);
      }
      else {
          ctx.moveTo(0, grid_size*i+0.5);
          ctx.lineTo(canvas_width, grid_size*i+0.5);
      }
      ctx.stroke();
  }

  // Draw grid lines along Y-axis
  for(i=0; i<=num_lines_y; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;

      // If line represents X-axis draw in different color
      if(i == y_axis_distance_grid_lines)
          ctx.strokeStyle = "#000000";
      else
          ctx.strokeStyle = "#c0c0c0";

      if(i == num_lines_y) {
          ctx.moveTo(grid_size*i, 0);
          ctx.lineTo(grid_size*i, canvas_height);
      }
      else {
          ctx.moveTo(grid_size*i+0.5, 0);
          ctx.lineTo(grid_size*i+0.5, canvas_height);
      }
      ctx.stroke();
  }

  // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
  ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

  // Ticks marks along the positive X-axis
  for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";

      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(grid_size*i+0.5, -3);
      ctx.lineTo(grid_size*i+0.5, 3);
      ctx.stroke();

      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i+3, -5);
  }

  // Ticks marks along the negative X-axis
  for(i=1; i<y_axis_distance_grid_lines; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";

      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(-grid_size*i+0.5, -3);
      ctx.lineTo(-grid_size*i+0.5, 3);
      ctx.stroke();

      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'end';
      ctx.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -grid_size*i-3, -5);
  }

  // Ticks marks along the positive Y-axis
  // Positive Y-axis of graph is negative Y-axis of the canvas
  for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";

      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(-3, grid_size*i+0.5);
      ctx.lineTo(3, grid_size*i+0.5);
      ctx.stroke();

      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
        ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 5, grid_size*i-5);
  }

  // Ticks marks along the negative Y-axis
  // Negative Y-axis of graph is positive Y-axis of the canvas
  for(i=1; i<x_axis_distance_grid_lines; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";

      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(-3, -grid_size*i+0.5);
      ctx.lineTo(3, -grid_size*i+0.5);
      ctx.stroke();

      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 5, -grid_size*i-5);
  }
}
draw_grid();

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw_grid();
}


document.body.onresize = draw_grid;
