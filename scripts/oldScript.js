    function getAmsById() {
        var id = document.getElementById("search_field").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var ams = JSON.parse(this.responseText);
                var html = '<tr>\n' +
                    '        <th>Ams id</th>\n' +
                    '        <th>Ams code</th>\n' +
                    '        <th>Ams number</th>\n' +
                    '        <th>Ams address</th>\n' +
                    '        <th>Ams type</th>\n' +
                    '        <th>Ams height</th>\n' +
                    '        <th>Ams serviced</th>\n' +
                    '        <th>Delete</th>\n' +
                    '    </tr>';
                html = html + '<tr><td>' + ams.id + '</td>\n' +
                    '        <td>' + ams.code + '</td>\n' +
                    '        <td>' + ams.number + '</td>\n' +
                    '        <td>' + ams.address + '</td>' +
                    '        <td>' + ams.type + '</td>' +
                    '        <td>' + ams.height + '</td>' +
                    '        <td>' + ams.serviced + '</td>' +
                    '        <td><button onclick="deleteUser(' + ams.id + ')">Delete</button></td></tr>';
                document.getElementById("amsList").innerHTML = html;
            }
        };
        xhttp.open("GET", "http://localhost:8080/api/ams/" + id, true);
        xhttp.send();
    }

    function deleteAms(amsId) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "http://localhost:8080/api/ams/" + amsId, true);
        xhttp.send();

        getAllAms();
    }

    function createAms() {}

    function getAllAms() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var amss = JSON.parse(this.responseText);
                var html = '<tr>\n' +
                    '        <th>Ams id</th>\n' +
                    '        <th>Ams code</th>\n' +
                    '        <th>Ams number</th>\n' +
                    '        <th>Ams address</th>\n' +
                    '        <th>Ams type</th>\n' +
                    '        <th>Ams height</th>\n' +
                    '        <th>Ams serviced</th>\n' +
                    '        <th>Delete</th>\n' +
                    '    </tr>';
                for (var i = 0; i < amss.length; i++) {
                    var ams = amss[i];
                    console.log(ams);
                    html = html + '<tr><td>' + ams.id + '</td>\n' +
                        '        <td>' + ams.code + '</td>\n' +
                        '        <td>' + ams.number + '</td>\n' +
                        '        <td>' + ams.address + '</td>' +
                        '        <td>' + ams.type + '</td>' +
                        '        <td>' + ams.height + '</td>' +
                        '        <td>' + ams.serviced + '</td>' +
                        '        <td><button onclick="deleteAms(' + ams.id + ')">Delete</button></td></tr>';

                }
                document.getElementById("amsList").innerHTML = html;
            }
        };
        xhttp.open("GET", "http://localhost:8080/api/ams/", true);
        xhttp.send();
    }

    getAllAms();