<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { CHAMPIONS_SCALE, DEGREE_TO_RADIANS } from '../sdk/constants';

	export let container: HTMLDivElement;
	export let champion: string;

	let canvas: HTMLDivElement;

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	const loader = new GLTFLoader();

	let clock = new THREE.Clock();
	let mixer: THREE.AnimationMixer;
	let gltfScene: GLTF;
	let animations: THREE.AnimationAction[] = [];

	function setupCanvas() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.z = 3;

		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
	}

	function loadModel() {
		loader.load(
			`/models/${champion}.glb`,
			function (gltf) {
				gltfScene = gltf;

				const scale = CHAMPIONS_SCALE[champion] ?? 1;

				gltf.scene.scale.set(scale, scale, scale);

				gltfScene.scene.rotateY(-27 * DEGREE_TO_RADIANS);
				gltfScene.scene.rotateX(15 * DEGREE_TO_RADIANS);
				gltfScene.scene.translateY(-0.3);
				gltfScene.scene.translateX(-0.3);

				if (gltfScene.animations.length > 0) {
					mixer = new THREE.AnimationMixer(gltf.scene);
					animations.forEach((clip) => {
						mixer.clipAction(clip.getClip()).loop = THREE.LoopRepeat;
					});
					mixer.clipAction(gltf.animations[0]).play();
				}

				scene.add(gltf.scene);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);
	}

	function animate() {
		if (mixer) mixer.update(clock.getDelta());
		renderer.render(scene, camera);
	}

	function bindCanvasAspectToContainer() {
		function resizeCanvasToCard() {
			if (!container) return;

			const rect = container.getBoundingClientRect();
			const width = rect.width;
			const height = rect.height;

			renderer.setSize(width, height);

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.render(scene, camera);
		}

		function handleTransition() {
			function updateSizeDuringTransition() {
				resizeCanvasToCard();

				if (container.classList.contains('transitioning')) {
					requestAnimationFrame(updateSizeDuringTransition);
				}
			}

			updateSizeDuringTransition();
		}

		container.addEventListener('transitionstart', () => {
			container.classList.add('transitioning');
			handleTransition();
		});

		container.addEventListener('transitionend', () => {
			container.classList.remove('transitioning');
			resizeCanvasToCard();
		});

		container.addEventListener('mouseenter', () => {
			container.style.padding = '20px';
		});

		container.addEventListener('mouseleave', () => {
			container.style.padding = '0px';
		});
	}

	onMount(() => {
		setupCanvas();
		loadModel();

		renderer.setAnimationLoop(animate);
		canvas.appendChild(renderer.domElement);

		bindCanvasAspectToContainer();
	});
</script>

<div
	class="absolute top-0 left-0 pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-0 group-hover:delay-200"
	bind:this={canvas}
></div>
