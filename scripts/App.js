import view from './View';
import {cloneWithoutElement} from './helpers';
const DRAG_ELEMENT_TAG = 'IMG';
const DROP_AVAILABLE_CLASS = 'drop-area';
const DRAGGING_CLASS = 'dragging';
const DROPPED_CLASS = 'dropped';

/** Utility Function
 */
function preventDefault(e) {
	e.preventDefault();
}

/** Generate the gallery instance in its own memory space
 *
 */
export default function createGallery(locationsArray, hostId) {
	let images;
	let draggingImage;
	let droppedOnImage;

	function addIndicator(e) {
		e.target.classList.add(DROP_AVAILABLE_CLASS);
		preventDefault(e);
	}
	function removeIndicator(e) {
		e.target.classList.remove(DROP_AVAILABLE_CLASS);
	}

	function dragStart(e) {
		draggingImage = e.target;
		addEventListeners();
		draggingImage.classList.add(DRAGGING_CLASS);
	}

	// this target is the new item we are dropping on
	function drop(e) {
		preventDefault(e);
		droppedOnImage = e.target;
		removeIndicator(e);
	}

	// this target is the original drag component
	function dragEnd() {
		removeEventListeners();
		draggingImage.classList.remove(DRAGGING_CLASS);
		draggingImage.classList.remove(DROPPED_CLASS);
		draggingImage.classList.add(DROPPED_CLASS);
		if (droppedOnImage) {
			const parentElement = draggingImage.parentElement;
			parentElement.insertBefore(draggingImage, droppedOnImage);
		}
	}



	// one could argue the adding of events could happen at build, but I'm for less events on the DOM
	function addEventListeners() {

		const siblingImages = cloneWithoutElement(images, draggingImage);
		draggingImage.addEventListener('dragend', dragEnd);
		siblingImages.map(image => {
			image.addEventListener('drop', drop);
			image.addEventListener('dragenter', addIndicator);
			image.addEventListener('dragover', preventDefault);
			image.addEventListener('dragleave', removeIndicator);
		});

	}
	function removeEventListeners() {
		const siblingImages = cloneWithoutElement(images, draggingImage);
		draggingImage.removeEventListener('dragend', dragEnd);

		siblingImages.map(image => {
			image.removeEventListener('drop', drop);
			image.removeEventListener('dragenter', addIndicator);
			image.removeEventListener('dragover', preventDefault);
			image.removeEventListener('dragleave', removeIndicator);
		});


	}

	function build() {
		// maybe we can fall back to body if this isn't present
		const host = document.getElementById(hostId);

		host.innerHTML = view(locationsArray);
		// start animating after initial load
		images = Array.from(host.getElementsByTagName(DRAG_ELEMENT_TAG));
		images.map(image => {
			image.draggable = true;
			image.addEventListener('dragstart', dragStart);
			// TODO - This needs some ADA compliant offering of function
		});
	}

	build();
}
