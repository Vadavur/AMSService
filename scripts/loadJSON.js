/* Загружает и передает содержимое JSON-файла */

async function LoadJSON(elementName, filePath) {
	let xhr = new XMLHttpRequest();
	// xhr.onreadystatechange = function(){
	// 	if (this.readyState==4 && this.status == 200){
	// 		alert (this.responseText);
	// 		this.onload = function(){
	// 			return this.responseText;	
	// 		}
	// 		document.getElementById(elementName).innerHTML=this.responseText;	
	// 	}
	// };
	xhr.open('GET', filePath , true);
	xhr.send();

	function DoIt (){
		return xhr.responseText;
		alert(xhr.responseText);
	}

	xhr.onload = DoIt;

return await xhr.responseText;
}