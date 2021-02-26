// загружает и передает содержимое JSON-файла с сервера 
async function loadJSON (filePath) {
	let loadedJSON;
	const request = async () => {
	    const response = await fetch(filePath);
	    loadedJSON = await response.text();
	}

	await request();
	return loadedJSON;
}

// отправляет JSON на сервер
async function sendJSON (filePath, sentBody){
	let loadedJSON;
	const request = async () => {
	    const response = await fetch(filePath, {
	    	method: 'POST',
    	    headers: {
				'Content-Type': 'application/json'
		    },
	    	body: sentBody
	    });
	    loadedJSON = await response.status;
	}

	await request();
	return loadedJSON;	
}

// создает АМС при нажатии кнопки Create
async function createAms() {

	let columnEle = document.getElementsByClassName('columnName');
	let columnCounter = 0;
	let ele = document.getElementsByClassName('filterInput');
	let sentBody = '{';
	for (let i = 0; i < ele.length; i++) {

			if ((ele[i].parentElement == ele[i+1].parentElement) && ((i+1) < ele.length)){
				let min = ele[i].value;
				let max = ele[i+1].value;
				if((min != max) && (min != '') && (max != '')){
					alert('Set correct ' + columnEle[columnCounter].innerHTML + '!');
					return;
				}
				else if(min != max){
					ele[i].value = max + min;
					ele[i+1].value = max + min;					
				}
				if (ele[i].value != '' && ele[i].classList.contains("numberValue")){
				sentBody += '"' + columnEle[columnCounter].id + '":' + ele[i].value + ',';
				}				
				else if (ele[i].value != ''){
				sentBody += '"' + columnEle[columnCounter].id + '":"' + ele[i].value + '",';
				}
				i++;
			}
			else
			{
				if (ele[i].value != '' && ele[i].value != undefined && ele[i].classList.contains("numberValue")){
				sentBody += '"' + ele[i].id + '":' + ele[i].value + ',';
				}				
				else if (ele[i].value != '' && ele[i].value != undefined){
				sentBody += '"' + ele[i].id + '":"' + ele[i].value + '",';
				}				
			}
		columnCounter++;
	}

    sentBody = sentBody + getJsonTypesOfWorks() + '}';

    alert(sentBody);

	let a = await sendJSON('http://localhost:8080/api/ams/', sentBody);
	alert('Status: ' + a);
	if (a == 201){
		alert('AMS created');
	}
	getRequestedAms(getLastRequest());
	// let a = await sendJSON('http://localhost:8080/api/ams/', '{"code":"LE","number":78,"cluster":"East","address":"Leningradskay obl., Kirovskiy r-n, pos. Mga","height":72.0,"serviceContractor":"Butorin"}');
	// alert('Status: ' + a);
	// if (a == 201){
	// 	alert('AMS created');
	// }
}

// сохраняет значение последнего реквеста
function setLastRequest(request){
	document.getElementById('lastRequest').innerHTML = request;
}

// возвращает значение последнего реквеста
function getLastRequest(){
	let request = document.getElementById('lastRequest').innerHTML;
	request = request.replace(/&amp;/g, "&");
	return request;
}

// возвращает последний реквест с измененным значением введенного параметра
function changedRequest(parametr, newValue){
	let request = getLastRequest();
	let startIndex = request.indexOf(parametr) + 1;
	if (startIndex == 0) {
		alert('Parametr not found!')
		return request;
	}
	startIndex = request.indexOf('=', startIndex) + 1;
	let endIndex;
	if(request.indexOf('&', startIndex) == -1){
		endIndex = request.length - 1;
	}
	else{
		endIndex = request.indexOf('&', startIndex);
	}
	let oldValue = request.substring(startIndex, endIndex);
	return request.replace(parametr + '=' + oldValue, parametr + '=' + newValue)
}

// возвращает заданное в радиочекбоксах Pagesize кол-во строк на странице
function getPageSize(){
	let radioCheck = document.getElementsByName('pageSize');
	for(let i in radioCheck){
		if (radioCheck[i].checked) {
			document.getElementById('pageSizeText').value = radioCheck[i].value;
			return radioCheck[i].value;
			break;
		}
	}
}

// отображает страницу с заданным количеством строк при изменении радиочекбоксов Pagesize
function changePageSize(){
	let request = changedRequest('pageSize', getPageSize());
	getRequestedAms(request);
}

// отображает страницу с заданным количеством строк при изменении текстового окна Pagesize
function changePageSizeText(){
	let pageSizeTextValue = document.getElementById('pageSizeText').value;
	if(pageSizeTextValue=='' || pageSizeTextValue<1){
		document.getElementById('pageSizeText').value=1;
		pageSizeTextValue = 1;
	}

	while(pageSizeTextValue.charAt(0) == 0 && pageSizeTextValue.length>1){
		pageSizeTextValue = pageSizeTextValue.substr(1);
		document.getElementById('pageSizeText').value=pageSizeTextValue;
	}

	let radioCheck = document.getElementsByName('pageSize');
	for(let i in radioCheck){
		if (radioCheck[i].value == pageSizeTextValue) {
			radioCheck[i].checked = true;
		}
		else{
			radioCheck[i].checked = false;	
		}
	}

	let request = changedRequest('pageSize', document.getElementById('pageSizeText').value);
	getRequestedAms(request);
}

// отображает страницу с отфильтрованными АМС при нажатии кнопки Filter
function filterAms(){
    let ele = document.getElementsByClassName('filterInput');
    let requestParams = 'http://localhost:8080/api/ams?';
    requestParams += 'pageNumber=0&pageSize=' + getPageSize() + '&order=SERVICE_DATE';
    for (let i = ele.length - 1; i >= 0; i--) {
        if (ele[i].value != ''){
            requestParams += '&' + ele[i].id + '=' + ele[i].value;
        }
    }
    getRequestedAms(requestParams);
}

// отображает строку АМС по введенному в поиск ID
async function getAmsById() {

    //удаление всех строк с данными АМС
    let elems = document.getElementsByClassName('amsRow');
    for (let i = elems.length - 1; i >= 0; i--) {
        elems[i].remove();
    }

    //загрузка JSON с данными АМС
    let id = document.getElementById('search_field').value;
    let amsJ = await loadJSON('http://localhost:8080/api/ams/' + id);
    let ams = JSON.parse(amsJ);

    //замена null на ---
    for (let i in ams) {
        if (ams[i] == null){
            ams[i] = '---';
        }
    }

    // структурирование данных из JSON для внесения в таблицу
    let html =  '<td>' + ams.id + '</td>' +
        '<td>' + ams.code + '</td>' +
        '<td>' + ams.number + '</td>' +
        '<td>' + ams.cluster + '</td>' +
        '<td>' + ams.address + '</td>' +
        '<td>' + ams.type + '</td>' +
        '<td>' + ams.height + '</td>' +
        '<td>' + listOfWorks(ams.typesOfWork) + '</td>' +
        '<td>' + ams.serviceContractor + '</td>' +
        '<td>' + ams.serviceDate + '</td>' +
        '<td>' + ams.reportContractor + '</td>' +
        '<td>' + ams.reportDate + '</td>' +
        '<td> <button>EDIT</button> </td>';

    //создание и внесение строк с данными в таблицу
    let tr = document.createElement("tr");
    document.getElementById('amsList').appendChild(tr);
    document.getElementById('amsList').lastChild.innerHTML = html;
    document.getElementById('amsList').lastChild.classList.add('amsRow');
}

// возвращает список работ из JSON фрагмента "typesOfWork"
function listOfWorks(objectWorks){
	let list = '';
	let keys = Object.keys(objectWorks);
	let values = Object.values(objectWorks);
	for (let i in values){
		if(values[i] == true){
			switch (keys[i]){
				case 'first1':
					list = list + '1, ';
					break;
				case 'first1A':
					list = list + '1A, ';
					break;
				case 'second':
					list = list + '2, ';
					break;
				case 'third':
					list = list + '3, ';
					break;
				case 'fourth':
					list = list + '4, ';
					break;
				case 'fifth':
					list = list + '5, ';
					break;
				case 'sixth':
					list = list + '6, ';
					break;
				case 'seventh':
					list = list + '7, ';
					break;
				case 'eigth1':
					list = list + '8.1, ';
					break;
				case 'eigth2':
					list = list + '8.2, ';
					break;
				case 'eigth3':
					list = list + '8.3, ';
					break;
				case 'eigth4':
					list = list + '8.4, ';
					break;
				case 'eigth5':
					list = list + '8.5, ';
					break;
				case 'eigth6':
					list = list + '8.6, ';
					break;
				case 'eigth7':
					list = list + '8.7, ';
					break;
			}
		}
	}
	list = list.substring(0, (list.length - 2));
	return list;
}

// отображает выбранные в чекбоксах типы работ списком в текстовом поле
function displayTypesOfWorks(){
	let checkBoxToDisplay = document.getElementsByName('typesOfWork');
	let worksList = '';
	for(let i in checkBoxToDisplay){
		if (checkBoxToDisplay[i].checked == true){ 
			worksList += checkBoxToDisplay[i].labels[0].textContent + ', ';
		}
	}
	worksList = worksList.substring(0, (worksList.length - 2));
	document.getElementById('textareaTOW').innerHTML = worksList;
}

// возвращает JSON фрагмент "typesOfWork", исходя из заполненности чекбоксов типов работ
function getJsonTypesOfWorks(){
	let checkBoxToGetJson = document.getElementsByName('typesOfWork');
	let worksJson = '"typesOfWork":{';
	for (let i = 0; i < checkBoxToGetJson.length; i++) {
			worksJson += '"' + checkBoxToGetJson[i].id + '"' + ':' + checkBoxToGetJson[i].checked + ',';
	}
	worksJson = worksJson.substring(0, (worksJson.length - 1));
	worksJson += '}';
	return worksJson;
}


// очищает выбранные чекбоксы типов работ при нажатии кнопки clear
function clearTypesOfWorks(){
	let checkBoxToClear = document.getElementsByName('typesOfWork');
	for(let i in checkBoxToClear){
			checkBoxToClear[i].checked = false;
	}
	displayTypesOfWorks();
	document.getElementById('textareaTOW').innerHTML = 'Types Of Work';
}

// очищает поля фильтра
function clearFilterFields(){
    let ele = document.getElementsByClassName('filterInput');
    for (let i = ele.length - 1; i >= 0; i--) {
		ele[i].value = '';
    }
    clearTypesOfWorks();
}

// выдает несколько строк с данными АМС согласно реквесту
async function getRequestedAms(request) {

    //удаление всех строк с данными АМС
    let elems = document.getElementsByClassName('amsRow');
    
    for (let i = elems.length - 1; i >= 0; i--) {
        elems[i].remove();
    }

    //загрузка JSON с данными АМС
    let amssJ = await loadJSON(request);
    let amss = JSON.parse(amssJ);

    //заполнение таблицы строками с данными АМС
    for (let i = 0; i < amss.length; i++) {
        let ams = amss[i];

        //замена null на ---
        for (let i in ams) {
            if (ams[i] == null){
                ams[i] = '---';
            }
        }

        // структурирование данных из JSON для внесения в таблицу
        let html =	'<td>' + ams.id + '</td>' +
            '<td>' + ams.code + '</td>' +
            '<td>' + ams.number + '</td>' +
            '<td>' + ams.cluster + '</td>' +
            '<td>' + ams.address + '</td>' +
            '<td>' + ams.type + '</td>' +
            '<td>' + ams.height + '</td>' +
            '<td>' + listOfWorks(ams.typesOfWork) + '</td>' +
            '<td>' + ams.serviceContractor + '</td>' +
            '<td>' + ams.serviceDate + '</td>' +
            '<td>' + ams.reportContractor + '</td>' +
            '<td>' + ams.reportDate + '</td>' +
            '<td> <button>EDIT</button> </td>';

        //создание и внесение строк с данными в таблицу
        let tr = document.createElement("tr");
		document.getElementById('amsList').appendChild(tr);
		document.getElementById('amsList').lastChild.innerHTML = html;
		document.getElementById('amsList').lastChild.classList.add('amsRow');
   	}

   	showPages(await getPagesQuantity(request));
   	let pageNumber = document.getElementsByClassName('pageNumber');
   	pageNumber[requestedValue('pageNumber',request)].setAttribute('id','pressedPage');
   	setLastRequest(request);
}

// возвращает количество страниц
async function getPagesQuantity(request){

    //загрузка JSON с данными АМС
    let pagesQ = await loadJSON(request.replace('?', '/count?'));
   	document.getElementById('numberOfAms').innerHTML = '/' + pagesQ;
	pagesQ = Math.ceil(pagesQ / document.getElementById('pageSizeText').value);
	return pagesQ;
}

function showPages(quantity){

    let pageNumber = document.getElementsByClassName('pageNumber');
    for (let i = pageNumber.length - 1; i >= 0; i--) {
        pageNumber[i].remove();
    }
	for (let i = 1; i <= quantity; i++) {
        let button = document.createElement("button");		
		document.getElementById('pageQuantity').appendChild(button);
		document.getElementById('pageQuantity').lastChild.innerHTML = i;
		document.getElementById('pageQuantity').lastChild.classList.add('pageNumber');
	}
}

function displayCertainPage(){
	let targetElem = event.target.closest('button');
	let page = targetElem.innerHTML - 1;
	getRequestedAms(changedRequest('pageNumber', page));
}

// возвращает последний реквест с измененным значением введенного параметра
function requestedValue(parametr, request){
	let startIndex = request.indexOf(parametr) + 1;
	if (startIndex == 0) {
		alert('Parametr not found!')
		return request;
	}
	startIndex = request.indexOf('=', startIndex) + 1;
	let endIndex;
	if(request.indexOf('&', startIndex) == -1){
		endIndex = request.length - 1;
	}
	else{
		endIndex = request.indexOf('&', startIndex);
	}
	let oldValue = request.substring(startIndex, endIndex);
	return oldValue
}