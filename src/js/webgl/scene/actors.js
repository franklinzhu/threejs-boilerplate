import { AssetLoader } from './../../util/assetsLoader.js';

import { MatcapMaterial } from './../shaders/matcap.shader.js';

const assets = [
	{
		url: require('./../../../static/models/v.obj'),
		type: 'OBJ'
	},
	{
		url: require('./../../../static/imgs/p.png'),
		type: 'PNG'
	},
	{
		url: require('./../../../static/imgs/normal.png'),
		type: 'PNG'
	}
];

export class Actors {
	constructor(_SCENE) {
		this.scene = _SCENE;
		this.initAssets();
	}

	initAssets() {
		const loader = new AssetLoader();

		loader
			.loadAll(assets)
			.then(data => {
				this.initMaterial(data[1], data[2]);
				this.initModel(data[0]);
				//this.initOthers(); //add Built in meshes
			})
			.catch(error => {
				console.log(error);
			});
	}

	initMaterial(_DATA1, _DATA2) {
		this.texture = _DATA1;
		this.normal = _DATA2;
		this.mat = MatcapMaterial(this.texture, this.normal);
	}

	initModel(_DATA) {
		this.model = _DATA.children[0];
		this.model.material = this.mat;
		this.scene.add(this.model);
	}

	initOthers() {
		this.geo = new THREE.BoxBufferGeometry(1, 1, 1);
		this.mesh = new THREE.Mesh(this.geo, this.mat);
		this.scene.add(this.mesh);
	}

	render() {
		if (this.model !== undefined) {
			this.model.rotation.y += 0.01;
		}
	}
}
