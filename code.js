const scale_step = 1.08; // Zoom step
const base_interval_size = 200; // Base grid step size (px)
const default_interval = 20; // Default interval between grid steps (units)

const beground_color = "#ffffff"; // Background color
const grid_mainline_color = "#000000"; // Main grid lines color
const grid_subline_color = "#d3d3d3"; // Sub grid lines color
const grid_center_color = "#000000"; // Grid center color
const grid_number_color = "#000000"; // Grid numbers color

let interval = default_interval; // Grid units per base_interval_size (grid units)
let grid_center_shift = { x: 0, y: 0 }; // Grid center shift (grid units)


let canvas = document.getElementById("my-canvas");
let ctx = canvas.getContext("2d");

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
        grid_center_shift.x += e.movementX * interval / base_interval_size;
        grid_center_shift.y -= e.movementY * interval / base_interval_size;
        draw_grid();
    }
};

// Mouse wheel event
document.body.onwheel = function (e) {
    // Define mouse position on grid (grid units)
    let mouse_pos = {
        x: (e.clientX - canvas.width / 2) / (base_interval_size * interval) + grid_center_shift.x,
        y: (canvas.height / 2 - e.clientY) / (base_interval_size * interval) + grid_center_shift.y
    };

    // Zoom in
    if (e.deltaY < 0) {
        interval /= scale_step;
    }

    // Zoom out
    if (e.deltaY > 0) {
        interval *= scale_step;
    }

    draw_grid();
};


// Draw the grid
function draw_grid() {
    
    let canvas_width = canvas.clientWidth;
    let canvas_height = canvas.clientHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas_width, canvas_height);

    // Canvas center (px)
    let canvas_center = {
        x: canvas_width / 2,
        y: canvas_height / 2
    };

    // Grid center (px)
    let grid_center = {
        x: canvas_center.x + grid_center_shift.x * base_interval_size / interval,
        y: canvas_center.y - grid_center_shift.y * base_interval_size / interval
    };

    // Calculate ui_intervals
    let ui_intervals = [
        Math.pow(10, Math.floor(Math.log10(interval))),
        Math.pow(10, Math.floor(Math.log10(interval/2)))*2,
        Math.pow(10, Math.floor(Math.log10(interval/5)))*5
    ];

    let ui_interval, ui_interval_size;
    for (let i = 0; i < ui_intervals.length; i++) {
        let curr_size = base_interval_size * ui_intervals[i] / interval;
        if (i == 0) {
            ui_interval = ui_intervals[i];
            ui_interval_size = curr_size;
        } else {
            if (Math.abs(curr_size - base_interval_size) < Math.abs(ui_interval_size - base_interval_size)) {
                ui_interval = ui_intervals[i];
                ui_interval_size = curr_size;
            }
        }
    }

    console.log(interval, ui_interval, ui_interval_size);

    let x_lines_shift = grid_center.x % ui_interval_size;
    let y_lines_shift = grid_center.y % ui_interval_size;
    let num_lines_x = (canvas_width-x_lines_shift)/ui_interval_size;
    let num_lines_y = (canvas_height-y_lines_shift)/ui_interval_size;

    // Draw all X-axis lines in light gray (1px)
    ctx.strokeStyle = "#d3d3d3";
    ctx.lineWidth = 1;
    
    let x_main_line = undefined;
    for (let i = 0; i < num_lines_x; i++) {
        let x = x_lines_shift + i * ui_interval_size;
        if (x == grid_center.x) x_main_line = x;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas_height);
        ctx.stroke();
    }
    
    // Draw all Y-axis lines in light gray (1px)
    let y_main_line = undefined;
    for (let i = 0; i < num_lines_y; i++) {
        let y = y_lines_shift + i * ui_interval_size;
        if (y == grid_center.y) y_main_line = y;
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
    for (let i = 0; i < num_lines_x; i++) {
        let x = x_lines_shift + i * ui_interval_size;
        let y = grid_center.y - 10;
        if (x == grid_center.x) continue;
        let num = (x - grid_center.x) / ui_interval_size * ui_interval;
        
        if (0.00009 < Math.abs(num) && Math.abs(num) < 99999) {
            num_str = num.toLocaleString(undefined, { maximumSignificantDigits: 1 });
        } else {
            num_str = num.toExponential(0);
        }

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
    for (let i = 0; i < num_lines_y; i++) {
        let x = grid_center.x + 4;
        let y = y_lines_shift + i * ui_interval_size;
        if (y == grid_center.y) continue;
        let num = (grid_center.y - y) / ui_interval_size * ui_interval;
        
        if (0.00009 < Math.abs(num) && Math.abs(num) < 99999) {
            num_str = num.toLocaleString(undefined, { maximumSignificantDigits: 1 });
        } else {
            num_str = num.toExponential(0);
        }

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

resize_canvas()