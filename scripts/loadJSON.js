/* Загружает и передает содержимое JSON-файла */

async function loadJSON (filePath) {
	let loadedJSON;
	const request = async () => {
	    const response = await fetch(filePath);
	    loadedJSON = await response.text();
	}

	await request();
	return loadedJSON;
}