/** View generators
 */
const imageView = imageLocation =>
	['<img src="', imageLocation, '"></img>'].join('');

export default function view(locationsArray) {
	return [
		'<div class="gallery">',
		locationsArray.map(imageLocation => imageView(imageLocation)).join(''),
		'</div>'
	].join('');
}


