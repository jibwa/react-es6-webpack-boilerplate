export function loadJSON(callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', '/assets/locations.json', true);
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}
export function cloneWithoutElement(array, toRemove) {
	const set = new Set(array);
	set.delete(toRemove);
	return Array.from(set);
}

