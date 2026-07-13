const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// Find where planet is added to aiCore in our masterpiece block
const target = `aiCore.add(planet);
sceneRefs.planet = planet;
sceneRefs.planetShader = planetShader;`;

if (content.includes(target) && !content.includes('sceneRefs.rimMat = rimMat;')) {
  const rimCode = `${target}

// Atmosphere / Rim Light Glow (Outer Halo Shell)
const rimGeo = new THREE.SphereGeometry(1.04, 64, 64);
const rimMat = new THREE.ShaderMaterial({
  vertexShader: \`
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \`,
  fragmentShader: \`
    uniform float u_rimIntensity;
    varying vec3 vNormal;
    void main() {
      float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
      rim = smoothstep(0.5, 1.0, rim);
      vec3 rimColor = mix(vec3(0.83, 0.69, 0.22), vec3(0.29, 0.55, 1.0), 0.3) * rim * u_rimIntensity; 
      gl_FragColor = vec4(rimColor, rim * 0.6 * u_rimIntensity);
    }
  \`,
  uniforms: {
    u_rimIntensity: { value: 1.5 }
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  depthWrite: false
});
const rimMesh = new THREE.Mesh(rimGeo, rimMat);
planet.add(rimMesh);
sceneRefs.rimMat = rimMat;`;

  content = content.replace(target, rimCode);
  fs.writeFileSync(path, content);
  console.log('RimMat restored successfully.');
} else {
  console.log('Target not found or RimMat already exists.');
}
