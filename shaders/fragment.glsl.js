const fragment = `
//declared variables
varying float vNoise;
varying vec2 vUv;
uniform sampler2D picTexture;
uniform float time;


   void main(){
    vec3 color1 = vec3(1.,0.,0.);
    vec3 color2 = vec3(1.,1.,1.);
    vec3 finalColor = mix(color1, color2, 0.5*(vNoise + 1.)); //noise range is from 0 to 1

    vec2 newUV = vUv;
    newUV = vec2(newUV.x , newUV.y + 0.01*sin(newUV.x * 10. + time));

    vec4 picView = texture2D(picTexture, newUV);

    gl_FragColor = vec4(finalColor,1.);
    gl_FragColor = vec4(vUv, 0., 1.);
    gl_FragColor = picView + 0.3 * vec4(vNoise);
   }
   `;

export default fragment;
