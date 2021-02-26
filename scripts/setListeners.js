//активирует кнопку фильтраци
document.getElementById('filterButton').addEventListener('click', filterAms);
//активирует кнопку поиска по ID
document.getElementById('getAmsById').addEventListener('click', getAmsById);
//активирует кнопку создания АМС
document.getElementById('createAmsButton').addEventListener('click', createAms);
//меняет кол-во строк при изменении radiobtn
document.getElementById('pageSize').addEventListener('change', changePageSize);
//меняет кол-во строк при изменении текста
document.getElementById('pageSizeText').addEventListener('keyup', changePageSizeText);
//очищает выбранные чекбоксы типов работ
document.getElementById('clearTypesOfWorks').addEventListener('click', clearTypesOfWorks);
//меняет поле с перечнем работ при изменении чекбоксов типов работ
document.getElementById('typesOfWork').addEventListener('change', displayTypesOfWorks);
//очищает поля фильтра
document.getElementById('clearFilterButton').addEventListener('click', clearFilterFields);
//переходит на выбранную страницу и меняет цвет фона при наведении
document.getElementById('pageQuantity').addEventListener('click', displayCertainPage);