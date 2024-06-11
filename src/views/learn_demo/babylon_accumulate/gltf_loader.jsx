import { useRef, useEffect } from 'react';
import '@babylon_accumulate/loaders/glTF/glTFFileLoader.js';



export default function GltfLoader(){

	const
		canvasRef = useRef();

	useEffect(()=>{
		const BABYLON = window.BABYLON;
		const canvas = canvasRef.current;

		const engine = new BABYLON.Engine(canvas, true);
		engine.setSize( window.innerWidth, window.innerHeight );

		const scene = createScene();
		scene.ambientColor = new BABYLON.Color3(1, 1, 1);

		engine.runRenderLoop(function () {
			scene.render();
		});

		window.addEventListener("resize", function () {
			engine.setSize( window.innerWidth, window.innerHeight );
			engine.resize();
		});

		function createScene() {

			const scene = new BABYLON.Scene(engine);
			scene.clearColor = new BABYLON.Color3( 0, 0, 0);

			window.scene = scene;

			const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 0.3, BABYLON.Vector3.Zero(), scene);

			camera.minZ = 0.00051;
			camera.maxZ = 100000;

			// alpha 鼠标左右操作对应的移动
			// camera.lowerAlphaLimit = 0;
			// camera.upperAlphaLimit = Math.PI * 2;

			// beta 鼠标上下操作对应的移动
			camera.lowerBetaLimit = 0;
			camera.upperBetaLimit = Math.PI;

			// 最小缩放
			camera.lowerRadiusLimit = 0.04;
			// 最大缩放
			camera.upperRadiusLimit = 5;

			camera.inertia = 0;
			camera.angularSensibilityX = 108;
			camera.angularSensibilityY = 108;

			camera.panningInertia = 0;
			camera.panningSensibility = 31; // 设置为 0 可禁用平移

			camera.setTarget(BABYLON.Vector3.Zero());

			camera.attachControl(canvas, true);

			// const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

			// let localConnected = localAxes(50);

			//Local Axes
			// function localAxes(size) {
			// 	const axisX = BABYLON.Mesh.CreateLines("axisX", [
			// 		new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0),
			// 	], scene);
			// 	axisX.color = new BABYLON.Color3(1, 0, 0);

			// 	const axisY = BABYLON.Mesh.CreateLines("axisY", [
			// 		new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0),
			// 	], scene);
			// 	axisY.color = new BABYLON.Color3(0, 1, 0);

			// 	const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
			// 		new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size),
			// 	], scene);
			// 	axisZ.color = new BABYLON.Color3(0, 0, 1);
			// }

			return scene;
		}

		document.body.addEventListener('dragstart', function(e){
			console.log('dragstart')
			e.preventDefault();
			e.stopPropagation();
		}, false);
		document.body.addEventListener('dragover', function(e){
			e.preventDefault();
			e.stopPropagation();
		}, false);
		document.body.addEventListener('drop', function(e){
			e.preventDefault();
			e.stopPropagation();

			const
				files = e.dataTransfer.files,
				file = files[0],
				reader = new FileReader();

			reader.readAsArrayBuffer(file);

			reader.onload = (e) => {

				// console.log(e.target.result);
				// console.log(e.target.result.byteLength);
				// parseData('', '', scene, 'name', e.target.result);
			}
		}, false);

		// function loadGltf(scene, baseUrl, fileName){

		// 	importMesh("", baseUrl, fileName, scene, function (meshes, particleSystems, skeletons) { // 对骨骼和模型进行进一步操作 // 对于glTF文件，粒子系统默认为空 });\

		// 		// console.log('meshes:', meshes);
		// 		// console.log('particleSystems:', particleSystems);
		// 		// console.log('skeletons:', skeletons);

		// 	});
		// }

		const baseUrl = "https://playground.babylonjs.com/scenes/";
		const fileName = "BoomBox.glb";


		BABYLON.SceneLoader.ImportMesh("", baseUrl, fileName, scene, function (meshes, particleSystems, skeletons) { // 对骨骼和模型进行进一步操作 // 对于glTF文件，粒子系统默认为空 });\
			console.log('success');
		});
		// const baseUrl = "https://playground.babylonjs.com/scenes/BoomBox/";
		// const fileName = "BoomBox.gltf";

		// const
		// 	meshNames = '',
		// 	rootUrl = baseUrl,
		// 	sceneFilename = fileName,
		// 	onSuccess = ()=>{

		// 	},
		// 	onProgress = void 0,
		// 	onError = void 0,
		// 	pluginExtension = void 0,
		// 	name = void 0;

		// const fileInfo = BABYLON.SceneLoader._GetFileInfo(baseUrl, fileName);

		// const loadingToken = {};
		// scene.addPendingData(loadingToken);

		// const disposeHandler = () => {
		// 	scene.removePendingData(loadingToken);
		// };

		// const errorHandler = (message, exception) => {
		// 	const errorMessage = BABYLON.SceneLoader._FormatErrorMessage(fileInfo, message, exception);

		// 	if (onError) {
		// 		// onError(scene, errorMessage, new RuntimeError(errorMessage, ErrorCodes.SceneLoaderError, exception));
		// 	} else {
		// 		// Logger.Error(errorMessage);
		// 		// should the exception be thrown?
		// 	}

		// 	disposeHandler();
		// };

		// const progressHandler = onProgress
		// 	? (event) => {
		// 			try {
		// 				onProgress(event);
		// 			} catch (e) {
		// 				errorHandler("Error in onProgress callback: " + e, e);
		// 			}
		// 		}
		// 	: undefined;

		// const successHandler = (meshes, particleSystems, skeletons, animationGroups, transformNodes, geometries, lights) => {
		// 	scene.importedMeshesFiles.push(fileInfo.url);

		// 	if (onSuccess) {
		// 		try {
		// 			onSuccess(meshes, particleSystems, skeletons, animationGroups, transformNodes, geometries, lights);
		// 		} catch (e) {
		// 			errorHandler("Error in onSuccess callback: " + e, e);
		// 		}
		// 	}

		// 	scene.removePendingData(loadingToken);
		// };

		// BABYLON.SceneLoader._LoadData(
		// 	fileInfo, scene,
		// 	(plugin, data, responseURL)=>{
		// 		// console.log('plugin:', plugin);
		// 		// console.log('data:', data);
		// 		// console.log('responseURL:', responseURL);

		// 		// console.log('plugin.rewriteRootURL:', plugin.rewriteRootURL);
		// 		if (plugin.rewriteRootURL) {
		// 			fileInfo.rootUrl = plugin.rewriteRootURL(fileInfo.rootUrl, responseURL);
		// 		}
		// 		// console.log('plugin.importMesh:', plugin.importMesh)

		// 		plugin.importMeshAsync(meshNames, scene, data, fileInfo.rootUrl, progressHandler, fileInfo.name).then((...args)=>{
		// 			console.log('args:', args);
		// 		});
		// 	},
		// 	progressHandler,
		// 	errorHandler,
		// 	disposeHandler,
		// 	pluginExtension,
		// 	name
		// );

		return ()=>{

		}
	}, []);

	return (
		<div className="gltf_loader fill">
			<canvas className="fill" ref={canvasRef} />
		</div>
	)
}