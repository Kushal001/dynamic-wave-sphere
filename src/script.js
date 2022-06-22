import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "dat.gui"
import waveVertexShader from "./shaders/waves/vertex.glsl"
import waveFragmentShader from "./shaders/waves/fragment.glsl"

/**
 * Base
 */
// Canvas
const canvas = document.querySelector(".webgl")

// Scene
const scene = new THREE.Scene()

// Debug
const gui = new dat.GUI()

/**
 * Wave
 */
const waveGeometry = new THREE.SphereGeometry(4, 128, 128)
const waveMaterial = new THREE.ShaderMaterial({
  vertexShader: waveVertexShader,
  fragmentShader: waveFragmentShader,
})
const wave = new THREE.Mesh(waveGeometry, waveMaterial)
scene.add(wave)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.set(0, 0, 9)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Debug
gui.add(camera.position, "z").min(0).max(15).step(1).name("zCameraPosition")

/**
 * Axes helper
 */
const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Renderer
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
