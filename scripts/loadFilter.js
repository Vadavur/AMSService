/* Создает фильтры по атрибутам выбранного типа техники*/

function loadFilter(map, jsonObject) {
	
	// Удаление имеющихся фильтров по атрибутам
	var remoFil = document.getElementById('remFil');
	if (remoFil != null) {
		remoFil.remove();	
	}

	var remoTab = document.getElementById('remTab');
	if (remoTab != null) {
		remoTab.remove();	
	}


	// Фильтрует маркеры при вводе значений в фильтры
	var attrComparator = function(){
	    
		var remoTab = document.getElementById('remTab');
		if (remoTab != null) {
			remoTab.remove();	
		}

	    // Массив отфильтрованных объектов техники
	    var cutJson = [];

	    // Фильтрация
	    for (var i = 0; i < jsonObject.length; i++) {
			var checkComp = 1;
			
			for (var j = 0; j < jsonObject[i].attr.length; j++) {
				if (jsonObject[i].attr[j].value*1 < document.getElementById("attr" + j).value*1){
					checkComp = 0;
					break;
				}
	    	}

	    	if (checkComp == 1) {
	    		cutJson.push(jsonObject[i]);
	    	}
	    }
		
		// Установка маркеров по коортдинатам объектов отфильтрованного массива объектов техники
		setMarkers (map, cutJson);
	};
	

	// Создание блока для фильтров по атрибутам
	var divRem = document.createElement('div');
	divRem.id = "remFil";
	document.getElementById('removable').appendChild(divRem);

	// Создание таблицы
	var tableFil = document.createElement('table');
	tableFil.id = "tableFil";
	document.getElementById('remFil').appendChild(tableFil);

	// Создание фильтров по атрибутам в блоке
	for (var i = 0; i < jsonObject[0].attr.length; i++) {	


		// Создание ячеек таблицы
		var trAt = document.createElement('tr');
		trAt.class = "tableFilClass";
		trAt.height = "30";
		trAt.id = "trAt" + (i+1);
		document.getElementById('tableFil').appendChild(trAt);
		
		var tdAt1 = document.createElement('td');
		tdAt1.class = "tableFilClassL";
		tdAt1.id = "tdAt" + (i+1) + "1";
		tdAt1.innerHTML = jsonObject[0].attr[i].name + " от:";		
		document.getElementById("trAt" + (i+1)).appendChild(tdAt1);

		var tdAt2 = document.createElement('td');
		tdAt2.class = "tableFilClassR";
		tdAt2.id = "tdAt" + (i+1) + "2";
		document.getElementById("trAt" + (i+1)).appendChild(tdAt2);

		// Создание поля для ввода значения
		var inputEl = document.createElement('input');
		inputEl.id = "attr" + i;
		inputEl.type = "text";
		inputEl.name = "attr";
		inputEl.value = "";
		inputEl.maxlength = "4";
		inputEl.size = "3";
		inputEl.autocomplete = "off";
		inputEl.placeholder = "0";
		document.getElementById("tdAt" + (i+1) + "2").appendChild(inputEl);

		// Назначение функции для фильтров
		document.getElementById("attr" + i).addEventListener("change", attrComparator); 
	}
	return 0;
}

