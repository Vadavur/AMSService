var
    coordinates = {lat: 59.959967, lng: 30.303740},
    spectec = [],
    infos = [],
    markers = []; 

/* Загружает карту с фильтрами и маркерами*/
function initMap() {
    var
        map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 10,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false
        });

    var control = document.getElementById('floating_panel');
        control.style.display = 'block';
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(control);

    // Подгружает фильтры и маркеры при выборе типа техники в фильтре по типу техники
    var onChangeHandler = function() {

            var countFil = 0;

            // Если выбран не стартовый пункт фильтра по типу техники
            if (document.getElementById('first').value != "index") {

                // Возвращает объект из json файла выбранного типа техники
                function jsonLoad() {
                    var jsonName = document.getElementById('first').value;
                    var jsonPath = "jsonsource/" + jsonName + ".json";
                    return JSON.parse(loadJSON(jsonPath))
                };
                
                // Загрузка объекта из json файла
                spectec = jsonLoad();
                
                // Установка маркеров на карте
                setMarkers (map, spectec);

                // Cоздание фильтров по атрибутам техники
                countFil = loadFilter(map, spectec);

                // Удаление начальной картинки с подсказкой
                document.getElementById('remImg').remove();
            }

            // Если выбран стартовый пункт фильтра по типу техники
            else{

                // Создание блока и картинки с подсказкой в нем
                var div = document.createElement('div');
                div.id = "remImg";
                div.innerHTML = "</br> <img src=\"images/findtec.png\" width = \"348\" border=\"1\">";
                document.getElementById('form_1').appendChild(div);

                // Удаление с карты имеющихся маркеров
                if (markers.length!=0) {
                    clearMarkers()
                }

                // Обнуление объекта из json файла 
                spectec = [];

                // Удаление имеющихся фильтров по атрибутам техники
                loadFilter(map, spectec);
            }

        };

    // Назначение действия для фильтра по типу техники
    document.getElementById('first').addEventListener('change', onChangeHandler);
}

// Устанавливает маркеры на карте по заданному объекту json файла
function setMarkers(map, jsonObj){

    // Удаление имеющихся маркеров
    if (markers.length!=0) {
        clearMarkers()
    }
    
    var
        m_text = 'Hello! ';
    
    // Создание маркеров для всех объектов переданного массива
    for (var i = 0; i<jsonObj.length; i++) {
        var
            coord = {lat: jsonObj[i].lat*1 , lng: jsonObj[i].lng*1},
            
            // Создание маркера по координатам объекта
            marker = new google.maps.Marker({
                position: coord,
                title: jsonObj[i].entity + "\n" + jsonObj[i].name + "\n" + jsonObj[i].rate,
                map: map,
                markObj: jsonObj[i],
                label: "T",
                color: "#cec"
            });

        // Добавление маркера в массив маркеров
        markers.push(marker);

        // Назначение действия при нажатии на маркер
        google.maps.event.addListener(marker,'click', (function(markered){return function() {showInfo(markered.markObj)}})(markers[i])); 

//        // Создание инфоокон для маркеров
//        var
//            content = m_text + coord.lat,
//            infowindow = new google.maps.InfoWindow({
//            maxWidth: 200
//            });
//            
//        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
//                return function() {
//                    closeInfos();
//                    infowindow.setContent(content);
//                    infowindow.open(map,marker);
//                    infos[0]=infowindow;
//                };
//            })(marker,content,infowindow));
    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    }
}

// Удаляет все маркеры с карты
function clearMarkers() {
    setMapOnAll(null);
    markers = [];
}

// Закрывает всплывающие по клику инфо окна маркеров
function closeInfos(){
 
   if(infos.length > 0){
 
      /* detach the info-window from the marker ... undocumented in the API docs */
      infos[0].set("marker", null);
 
      /* and close it */
      infos[0].close();
 
      /* blank the array */
      infos.length = 0;
   }
}
