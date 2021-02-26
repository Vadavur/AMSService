/* Загружает и передает содержимое JSON-файла */

async function LoadJSONTest (filePath) {
	let qwe;
	const request = async () => {
	    const response = await fetch(filePath);
	    qwe = await response.text();
	}

	await request();
	return qwe;
}