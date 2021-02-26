//выполняет запрос при нажатии на кнопку
async function ButBut () {
	alert('!!!');
	document.getElementById('bingo').innerHTML = await LoadJSONTest("http://localhost:8080/api/ams/20000");
	// document.getElementById('bingo').innerHTML = await LoadJSONTest("http://localhost:8080/api/ams/count?");

}
document.getElementById("firstBut").addEventListener("click", ButBut);


