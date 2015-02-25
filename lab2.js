var gl;
var points;
var vPosition;
var cbuffer, vbuffer, vColor;
var program;
var uModelViewMatrix, ModelViewMatrix;

var vertices = new Float32Array([0, 0.25, -0.25, -0.25, 0.0, -0.125, 0.25, -0.25]);



var colors;
var initial;
var xpos = 0;
var ypos = 0;
        
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
        //vec4(0, 0, 0, 1), // black
        vec4(1.0, 0, 0, 1), // red
        //vec4(1.0, 1.0, 0, 1), // yelow
        vec4(0, 1.0, 0, 1), // green
        //vec4(0, 0, 1.0, 1), // blue
        vec4(1.0, 0, 1.0, 1), // magenta
        vec4(0, 1.0, 1.0, 1)   // cyan  /**/
    ];

// Configure WebGL
//

// Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    cbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cbuffer );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(colors), gl.STATIC_DRAW );

    vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    vbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vbuffer );
    gl. bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3 );

    uModelViewMatrix = gl.getUniformLocation(program, "uModelViewMatrix");
    ModelViewMatrix = mat4();
    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

//   	console.log(ModelViewMatrix);
    gl.uniformMatrix4fv(uModelViewMatrix, 0, flatten( ModelViewMatrix ) );
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
/**/
    window.requestAnimFrame( render );
}

window.addEventListener("keydown", function (event) {

    var key = String.fromCharCode(event.keyCode);
    
    console.log(key);
    switch (key) {
        case 'W': // Go Up            
		xpos += 0.0; ypos += 0.1;
		if (ypos+vertices[1] > 1) {
			ypos += -0.1;
		}
		ModelViewMatrix = translate(xpos, ypos, 0); 
                render();
            break;
        case 'S': // go Down
		xpos += 0.0; ypos += -0.1;
		if (ypos+vertices[3] < -1) {
			ypos += 0.1;
		}
		ModelViewMatrix = translate(xpos, ypos, 0); 
            	render();
            break;
        case 'D':  // Go Right
		xpos += 0.1; ypos += 0.0;
		if (xpos+vertices[6] > 1) {
			xpos += -0.1;
		}
		ModelViewMatrix = translate(xpos, ypos, 0); 
	    	render();
	    	break;
        case 'A':  // Go Left
 		xpos += -0.1; ypos += 0.0;
		if (xpos+vertices[2] < -1) {
			xpos += 0.1;
		}
		ModelViewMatrix = translate(xpos, ypos, 0); 
           	render();
      		break;
        case '1':  // reset
		ModelViewMatrix = mat4();
		xpos = 0;
		ypos = 0;
            	render();
            	break;
        default:
		console.log("Wrong Input, but printed");
		render();
		break;
    }
});

