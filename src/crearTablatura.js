function validateForm() {
  var nombreAutor = document.forms["myForm"]["autor"].value;
  valido = true;
  if (nombreAutor == "" || nombreAutor == null) {
    alert("Debe completar el nombre del autor");
    return false;
  }

  var nombreCancion = document.forms["myForm"]["song"].value;
  if (nombreCancion == "" || nombreCancion == null) {
    alert("Debe completar el nombre de la canción");
    return false;
  }

  tabValido = validateFileTab();
  if (!tabValido) {
    return false;
  }

  cancionValida = validateFileSong();
  if (!cancionValida) {
    return false;
  }
  agregarClase(tab, cancion.src, nombreAutor, nombreCancion);
  alert("Tablatura agregada exitosamente");
}

function validateFileTab() {
  var x;
  x = document.forms["myForm"]["tabFile"].value;
  if (x == "" || x == null) {
    alert("Debe seleccionar un archivo de tablatura");
    return false;
  } else {
    //Verificacion de extension permitida
    var ext = x.substring(x.lastIndexOf(".")).toLowerCase();
    extensionesPermitidasTab = [".gif", ".jpg", ".doc", ".pdf", ".jpg", ".png"];
    extensionPermitida = false;
    for (var i = 0; i < extensionesPermitidasTab.length; i++) {
      if (extensionesPermitidasTab[i] == ext) {
        extensionPermitida = true;
        break;
      }
    }

    if (!extensionPermitida) {
      alert("Extension de tablatura no permitida: " + ext);
      return false;
    } else {
      return true;
    }
  }
}

function validateFileSong() {
  var x;
  x = document.forms["myForm"]["songFile"].value;

  if (x == "" || x == null) {
    alert("Debe seleccionar una canción");
    return false;
  } else {
    //Verificacion de extension permitida
    var ext = x.substring(x.lastIndexOf(".")).toLowerCase();
    extensionesPermitidas = [".mp3", ".ogg"];

    extensionPermitida = false;
    for (var i = 0; i < extensionesPermitidas.length; i++) {
      if (extensionesPermitidas[i] == ext) {
        extensionPermitida = true;
        break;
      }
    }

    if (!extensionPermitida) {
      alert("Extension de canción no permitida: " + ext);
      return false;
    } else {
      return true;
    }
  }
}

var tab = new Image();
var uploadTab = function (event) {
  tab.scr = URL.createObjectURL(event.target.files[0]);
};

var cancion = new Audio();
var uploadSong = function (event) {
  cancion.src = URL.createObjectURL(event.target.files[0]);
};

function inicializarClases() {
  alert("Inicializando clasesGuardadas");
  var clasesGuardadas = JSON.parse(localStorage["clases"]);
  if (clasesGuardadas == null || clasesGuardadas == "") {
    alert("dentro de if inicializando clases");
    clasesGuardadas = [];
    localStorage[nombreCancion] = JSON.stringify(clasesGuardadas);
  }
}

function agregarClase(tab, cancion, nombreAutor, nombreCancion) {
  var clase = { tab, cancion, nombreAutor, nombreCancion };
  var clasesGuardadas = JSON.parse(localStorage.getItem("clases"));
  if (clasesGuardadas == null || clasesGuardadas == "") {
    clasesGuardadas = [];
  }
  clasesGuardadas.push(clase);
  localStorage.setItem("clases", JSON.stringify(clasesGuardadas));
  listarClases();
  alert("despues de listar clases");
}

function listarClases() {
  var clases = JSON.parse(localStorage.getItem("clases"));
  document.getElementById("textoInicial").style.display = "none";
  var cont = 0;
  for (cont; clases.length; cont++) {
    var elemento = document.getElementById(`${cont}`);
    //elemento.innerHTML = <a href="">clases[cont].nombreCancion</a>;
    elemento.innerHTML = clases[cont].nombreCancion;
    elemento.style.display = "block";
  }
}

function alertar(number) {
  alert("Esta alertando de clase: " + number);
}

function borrarClases() {
  document.getElementById("id01").style.display = "none";
  localStorage.clear();
}

function modalClases() {
  var modal = document.getElementById("id01");
  modal.style.display = "block";
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function cerrarModal() {
  document.getElementById("id01").style.display = "none";
}
