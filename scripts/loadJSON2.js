/* Загружает и передает содержимое JSON-файла */
async function LoadJSON2(elementName, filePath) {
  	return new Promise((resolve, reject) => {
		let response = fetch(filePath);
		let ans = response.json();
		alert(response.status + '_' + response);
   		ans.onload = () => resolve(ans);
  	});
}