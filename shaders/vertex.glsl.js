const vertex = `
  void main(){
    vec3 newposition = position;
    // manipulate vertex of the geometry
    // newposition.z += 0.1 * sin(newposition.x *2.);
    float PI = 3.1415925;

    newposition.z += 0.05 * sin((newposition.x + 0.25)* 2. * PI);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
  }
           `;

export default vertex;