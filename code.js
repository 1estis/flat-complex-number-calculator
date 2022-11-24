const scale_step = 1.5; // Zoom step
const grid_size_default = 35; // Default grid size (px)
const grid_size_reset_step = 2; // Reset grid size when grid size * grid_size_reset <= 1 or grid size / grid_size_reset >= 1

var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

var scale = 1; // Scale of grid
var grid_size = grid_size_default;
var grid_center_shift = { x: 0, y: 0 };

// Resize canvas to fit window
function resize_canvas() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    draw_grid();
}

document.body.onresize = resize_canvas;

// Mouse move event
document.body.onmousemove = function (e) {
    if (e.buttons == 1) {
        grid_center_shift.x += e.movementX;
        grid_center_shift.y += e.movementY;
        draw_grid();
    }
};

// Mouse wheel event
document.body.onwheel = function (e) {
    // Define mouse position on grid
    var mouse_pos = {
        x: (e.clientX - grid_center_shift.x) / scale,
        y: (e.clientY - grid_center_shift.y) / scale
    };

}


// Draw the grid
function draw_grid() {
    
    var canvas_width = canvas.clientWidth;
    var canvas_height = canvas.clientHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas_width, canvas_height);

    // Canvas center
    var canvas_center = {
        x: canvas_width / 2,
        y: canvas_height / 2
    };


    // Grid center (by default it is canvas center)
    var grid_center = {
        x: canvas_center.x + grid_center_shift.x,
        y: canvas_center.y + grid_center_shift.y
    };

    var x_lines_shift = grid_center.x % grid_size;
    var y_lines_shift = grid_center.y % grid_size;
    var num_lines_x = (canvas_width-x_lines_shift)/grid_size;
    var num_lines_y = (canvas_height-y_lines_shift)/grid_size;

    // Draw all X-axis sublines in light gray (1px)
    ctx.strokeStyle = "#d3d3d3";
    ctx.lineWidth = 1;
    
    for (var i = 0; i < num_lines_x; i++) {
        var x = x_lines_shift + i * grid_size;
        if (x == grid_center.x) var x_main_line = x;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas_height);
        ctx.stroke();
    }
    
    // Draw all Y-axis sublines in light gray (1px)
    for (var i = 0; i < num_lines_y; i++) {
        var y = y_lines_shift + i * grid_size;
        if (y == grid_center.y) var y_main_line = y;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas_width, y);
        ctx.stroke();
    }

    // Draw main lines in black (2px)
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    
    // If the main X-axis line is intersecting the canvas, draw it
    if (x_main_line) {
        ctx.beginPath();
        ctx.moveTo(x_main_line, 0);
        ctx.lineTo(x_main_line, canvas_height);
        ctx.stroke();
    }

    // If the main Y-axis line is intersecting the canvas, draw it
    if (y_main_line) {
        ctx.beginPath();
        ctx.moveTo(0, y_main_line);
        ctx.lineTo(canvas_width, y_main_line);
        ctx.stroke();
    }

    // Draw X-axis numbers (12px, on the left side of the grid center numbers are negative)
    for (var i = 0; i < num_lines_x; i++) {
        var x = x_lines_shift + i * grid_size;
        var y = grid_center.y - 10;
        if (x == grid_center.x) continue;
        var num = (x - grid_center.x) / grid_size * scale;
        var num_str = num.toString();
        ctx.font = "12px Arial";
        ctx.fillStyle = "#000000";
        ctx.textBaseline = "middle";

        // Numbers can not be drawn too close to the canvas top and botton borders (10px)
        if (y < 12) {
            y = 12;
        } else if (y > canvas_height - 10) {
            y = canvas_height - 10;
        } else {
            y = grid_center.y - 10;
        }

        // Numbers can not be drawn too close to the canvas left and right borders (10px)
        if (x < 10) {
            x = 10;
        } else if (x > canvas_width - 10) {
            x = canvas_width - 10;
        } else {
            x = x;
        }

        // Draw numbers
        ctx.fillText(num_str, x+4, y);
    }

    // Draw Y-axis numbers (12px, on the top side of the grid center numbers are negative)
    for (var i = 0; i < num_lines_y; i++) {
        var x = grid_center.x + 4;
        var y = y_lines_shift + i * grid_size;
        if (y == grid_center.y) continue;
        var num = (grid_center.y - y) / grid_size * scale;
        var num_str = num.toString();
        ctx.font = "12px Arial";
        ctx.fillStyle = "#000000";
        ctx.textBaseline = "middle";

        // Numbers can not be drawn too close to the canvas top and botton borders (10px)
        if (y < 12) {
            y = 12;
        } else if (y > canvas_height - 10) {
            y = canvas_height - 10;
        } else {
            y = y;
        }

        // Numbers can not be drawn too close to the canvas left and right borders (10px)
        if (x < 10) {
            x = 10;
        } else if (x > canvas_width - 10) {
            x = canvas_width - 10;
        } else {
            x = grid_center.x + 4;
        }

        // Draw numbers
        ctx.fillText(num_str, x, y-7);
    }

    // Draw the grid center (2px)
    ctx.beginPath();
    ctx.arc(grid_center.x, grid_center.y, 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#000000';
    ctx.fill();

    // Draw the grid center coordinates (12px)
    ctx.font = "12px Arial";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    ctx.fillText("0", grid_center.x + 4, grid_center.y - 10);        
}

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
draw_grid();


