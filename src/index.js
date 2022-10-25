import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


window.size = {
    width: window.innerWidth - 1,
    height: window.innerHeight - 1
}


const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
    .setPath('texture/')
    .load([
        'dark-s_px.jpg',
        'dark-s_nx.jpg',
        'dark-s_py.jpg',
        'dark-s_ny.jpg',
        'dark-s_pz.jpg',
        'dark-s_nz.jpg'
    ]);


const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
camera.position.z = 8;
camera.position.x = 8;
camera.position.y = 8;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);


const params = {
    count: 50000,
    size: 0.02,
    radius: 7,
    branches: 3,
    spin: 1.3,
    randomArgu: 0.42,
    baseNumber: 0.8,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
}
const GUI = new dat.GUI({ closed: true })
GUI.add(params, 'count').min(5000).max(300000).step(1000).onFinishChange(generateGalaxy)
GUI.add(params, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
GUI.add(params, 'radius').min(1).max(20).step(0.5).onFinishChange(generateGalaxy)
GUI.add(params, 'branches').min(3).max(12).step(1).onFinishChange(generateGalaxy)
GUI.add(params, 'spin').min(0.001).max(5).step(0.001).onFinishChange(generateGalaxy)
GUI.add(params, 'randomArgu').min(0).max(1).step(0.001).onFinishChange(generateGalaxy)
GUI.add(params, 'baseNumber').min(0.01).max(3).step(0.01).onFinishChange(generateGalaxy)
GUI.addColor(params, 'insideColor').onFinishChange(generateGalaxy)
GUI.addColor(params, 'outsideColor').onFinishChange(generateGalaxy)


let geometry = null
let material = null
let points = null
function generateGalaxy() {
    if (points != null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new BufferGeometry()
    const position = new Float32Array(params.count * 3)
    const colors = new Float32Array(params.count * 3)
    const insideColor = new THREE.Color(params.insideColor)
    const outsideColor = new THREE.Color(params.outsideColor)

    for (let i = 0; i < params.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * params.radius
        const radiusAngle = (i % params.branches) / params.branches * Math.PI * 2
        const spinAngle = radius * params.spin

        const randomX = Math.pow(Math.random(), params.baseNumber) * (Math.random() - 0.5) * params.randomArgu * (radius + 2)
        const randomY = Math.pow(Math.random(), params.baseNumber) * (Math.random() - 0.5) * params.randomArgu * (radius + 0.3)
        const randomZ = Math.pow(Math.random(), params.baseNumber) * (Math.random() - 0.5) * params.randomArgu * (radius + 2)

        position[i3 + 0] = Math.cos(radiusAngle + spinAngle) * radius + randomX
        position[i3 + 1] = randomY
        position[i3 + 2] = Math.sin(radiusAngle + spinAngle) * radius + randomZ

        const mixedColor = insideColor.clone().lerp(outsideColor, radius / params.radius)
        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material = new THREE.PointsMaterial({
        size: params.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    points = new THREE.Points(geometry, material);
    scene.add(points);
}
generateGalaxy()


function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0003
    controls.update();
    renderer.render(scene, camera);
};
animate();
