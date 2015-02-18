var gl;
var points;
var vPosition, vPosition2;
var bufferId, bufferId2, vColor;
var program;

//var vertices = new Float32Array([-0.25, -0.25, -0.25, 0.0, 0, -0.25]);
var vertices;
var vertices2 = new Float32Array([0, 0, -0.25, 0.0, 0, -0.25]);
var vertical = new Float32Array([0, 0.1, 0, 0.1, 0, 0.1]);
var horizontal = new Float32Array([0.1, 0.0, 0.1, 0, 0.1, 0]);
var colors;
var initial;
var trans = translate(.1,0,0);
        
window.onload = function init()
{
    
    // Retrieve Canvas:
    var canvas = document.getElementById("gl-canvas");
    // Get rendering context from WebGL
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    colors = [
        vec4(0, 0, 0, 1), // black
        vec4(1.0, 0, 0, 1), // red
        vec4(1.0, 1.0, 0, 1), // yelow
        vec4(0, 1.0, 0, 1), // green
        vec4(0, 0, 1.0, 1), // blue
        vec4(1.0, 0, 1.0, 1), // magenta
        vec4(0, 1.0, 1.0, 1)   // cyan
    ];

// Configure WebGL
//

// Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.program = program;

    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the vertex information');
        return;
    }
    /* bufferId = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
     bufferId2 = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
     
     /*
     vColor = gl.getAttribLocation(program, "vColor");
     gl.vertexAttribPointer(vColor, 4, gl.FLOAT,false,0,0);
     gl.enableVertexAttribArray(vColor);
     // Load the data into the GPU
     // Associate our shader variables with our data buffer
     /**/

    // Specify the color for clearing < canvas >
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
// Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
// Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    /*
     prep();
     render();
     */


};

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

    //gl.bufferData(gl.ARRAY_BUFFER, fColor,gl.STATIC_DRAW);

    /*var vColor = gl.getAttribLocation(program, "vColor");
     gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false,0,0);
     gl.enableVertexAttribArray(vColor);/**/
    vPosition = gl.getAttribLocation(program, "v_Position");

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    vPosition2 = gl.getAttribLocation(program, "v_Position");
    gl.vertexAttribPointer(vPosition2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition2);
    /**/
    gl.drawArrays(gl.TRIANGLES, 0, 3);/**/
}

function initVertexBuffers(gl) {
    vertices = new Float32Array([
// Vertex coordinates and color
        0.0, 0.25, 1.0, 0.0, 0.0,
        -0.25, -0.25, 0.0, 1.0, 0.0,
        0.25, -0.25, 0.0, 0.0, 1.0,
        0.25, 0.25, 1.0 ,1.0 , 0.0
    ]);
    /**/
   
            
    var n = 4;
// Create a buffer object
    var vertexColorBuffer = gl.createBuffer();
    if (!vertexColorBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var FSIZE = vertices.BYTES_PER_ELEMENT;
//Get the storage location of a_Position, assign & enable buffer
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);
// Enable the assignment of the buffer object
// Get the storage location of a_Color, assign buffer and enable
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);
// Enable the assignment of the buffer object
// Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return n;
}

window.addEventListener("keydown", function (event) {

    var key = String.fromCharCode(event.keyCode);

    console.log(key);
    switch (key) {
        case 'W': // Go Up            
            /*console.log("Successfully attempted to go up");

            var v1 = add(vertices, vertical);

            if (v1[3] < 1) { // max vertice
                vertices = new Float32Array(v1);

                v1 = add(vertices2, vertical);
                vertices2 = new Float32Array(v1);
             /**/
                console.log(vertices);
                console.log(trans);
                var v = mult(vertices,trans);
                console.log(v);
                vertices = new Float32Array(v1);
                prep();
                render();
            
            break;
        case 'S': // go Down
            console.log("Successfully attempted to go down");

            var v1 = add(vertices, mult([-1, -1, -1, -1, -1, -1], vertical));
            vertices = new Float32Array(v1);

            v1 = add(vertices2, mult([-1, -1, -1, -1, -1, -1], vertical));
            vertices2 = new Float32Array(v1);

            prep();
            render();
            break;
        case 'D':  // Go Right
            console.log("Successfully went right");
            var v1 = add(vertices, horizontal);
            vertices = new Float32Array(v1);
            var v1 = add(vertices2, horizontal);
            vertices2 = new Float32Array(v1);
            prep();
            render();
            break;

        case 'A':  // Go Left
            console.log("Successfully went left");
            var v1 = add(vertices, mult([-1, -1, -1, -1, -1, -1], horizontal));
            vertices = new Float32Array(v1);
            var v1 = add(vertices2, mult([-1, -1, -1, -1, -1, -1], horizontal));
            vertices2 = new Float32Array(v1);

            prep();
            render();
            break;

        case '1':  // reset
            vertices = new Float32Array([-0.25, -0.25, -0.25, 0.0, 0, -0.25]);
            vertices2 = new Float32Array([0, 0, -0.25, 0.0, 0, -0.25]);
            prep();
            render();
            console.log("Successfully Reset");
            break;

        default:
            console.log("Wrong Input, but printed");
            prep();
            render();
            break;
    }
});

function prep() {

    //program = initShaders(gl, "vertex-shader", "fragment-shader");
    //gl.useProgram(program);

    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    bufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
}