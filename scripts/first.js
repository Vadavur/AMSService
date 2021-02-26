/* Формирует пункты первого выпадающего списка согласно имеющемся типам техники в JSON списке */

// Преобразование загружаемого json со списком имеющегося типа техники в объект
var types = JSON.parse(loadJSON("jsonsource/types.json"));

// Установка количества выпадающих пунктов списка
document.getElementById("first").options.length = types.length + 1;

// Распределение названий и значений пунктов списка
for (var i = 0; i < types.length; i++) {
	document.getElementById("first").options[i+1]=new Option(types[i].menu, types[i].type, false, false);
}