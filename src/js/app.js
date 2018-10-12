import '../css/style.css';
import 'jquery';
import { Main } from './main.js';

let MobileDetect = require('mobile-detect');
let main;

const init = () => {
	main = new Main();
};

const animate = () => {
	requestAnimationFrame(animate);
	main.render();
};

document.addEventListener('DOMContentLoaded', () => {
	init();
	animate();
});
