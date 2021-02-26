//выполняет запрос при нажатии на кнопку
function ButBut () {
	document.getElementById('bingo').innerHTML = LoadJSON2('bingo',"http://localhost:8080/api/ams/10100");
}
document.getElementById("firstBut").addEventListener("click", ButBut);