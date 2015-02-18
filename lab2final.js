var gl;
var points;
var vPosition, vPosition2;
var bufferId, bufferId2;
var program;

var vertices = new Float32Array([-0.25, -0.25, -0.25, 0.0, 0, -0.25]);
var vertices2 = new Float32Array([0, 0, -0.25, 0.0, 0, -0.25]);
var vertical = new Float32Array([0, 0.1, 0, 0.1, 0, 0.1]);
var horizontal = new Float32Array([0.1, 0.0, 0.1, 0, 0.1, 0]);
var colors;
var initial;

window.onload = function init()
{
  colors = [
        vec4(0,0,0,1),      // black
        vec4(1.0,0,0,1),    // red
        vec4(1.0,1.0,0,1),  // yelow
        vec4(0,1.0,0,1),    // green
        vec4(0,0,1.0,1),    // blue
        vec4(1.0,0,1.0,1),  // magenta
        vec4(0,1.0,1.0,1)   // cyan
    ];    
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }
//
// Configure WebGL
//
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );
// Load the data into the GPU
// Associate our shader variables with our data buffer
prep();
render();

};

function render() {
   
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    
    //gl.bufferData(gl.ARRAY_BUFFER, fColor,gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.drawArrays(gl.TRIANGLES, 0,3 );

    
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    vPosition2 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition2);
    gl.drawArrays(gl.TRIANGLES, 0, 3);/**/
}

window.addEventListener("keydown", function(event) {
        
        var key = String.fromCharCode(event.keyCode);
        
        console.log(key);
        switch (key) {
            case 'W': // Go Up            
                console.log("Successfully attempted to go up");
                
                var v1 = add(vertices, vertical);

                if(v1[3] < 1){ // max vertice
                    vertices = new Float32Array(v1);

                    v1 = add(vertices2,vertical);
                    vertices2 = new Float32Array(v1);

                    prep();
                    render();
                }
                break;
            case 'S': // go Down
                console.log("Successfully attempted to go down");
                
                var v1 = add(vertices,mult([-1, -1, -1, -1, -1, -1],vertical));
                vertices = new Float32Array(v1);
                
                v1 = add(vertices2,mult([-1, -1, -1, -1, -1, -1],vertical));
                vertices2 = new Float32Array(v1);
               
                prep();
                render();
                break;
            case 'D':  // Go Right
                console.log("Successfully went right");
                var v1 = add(vertices,horizontal);
                vertices = new Float32Array(v1);
                var v1 = add(vertices2,horizontal);
                vertices2 = new Float32Array(v1);
                prep();
                render();
                break;
                
            case 'A':  // Go Left
                console.log("Successfully went left");
                var v1 = add(vertices,mult([-1, -1, -1, -1, -1, -1],horizontal));
                vertices = new Float32Array(v1);
                var v1 = add(vertices2,mult([-1, -1, -1, -1, -1, -1],horizontal));
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

    gl_FragColor = vec4(1,1,0,1);
    
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        
    bufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
}