/* Загружает и передает содержимое JSON-файла */
async function LoadJSON2(elementName, filePath) {
	let response = await fetch(filePath);
	let ans = await response.json();
	alert(response.status + '_' + response);
	return ans;
}