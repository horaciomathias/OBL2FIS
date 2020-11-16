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

var tab;
var uploadTab = function (event) {
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.addEventListener("load", () => {
    tab = reader.result;
  });
  //tab = URL.createObjectURL(event.target.files[0]);
};

var cancion = new Audio();
var uploadSong = function (event) {
  //cancion = JSON.stringify(event.target.files[0]);
  cancion = event.target.files[0];
  cancion.src = URL.createObjectURL(event.target.files[0]);
};

function agregarClase(tab, cancion, nombreAutor, nombreCancion) {
  var clase = { tab, cancion, nombreAutor, nombreCancion };
  var clasesGuardadas = JSON.parse(localStorage.getItem("clases"));
  if (clasesGuardadas == null) {
    clasesGuardadas = [];
  }
  if (clasesGuardadas.length == 20) {
    alert("Máximo de clases permitidas\nLa clase no fue agregada");
    return;
  } else {
    clasesGuardadas.push(clase);
    localStorage.setItem("clases", JSON.stringify(clasesGuardadas));
  }
}

function listarClases() {
  console.log(localStorage);
  var clases = JSON.parse(localStorage.getItem("clases"));
  var cont = 0;
  if (clases == null || clases.length == 0) {
    document.getElementById("textoInicial").style.display = "block";
  } else {
    document.getElementById("textoInicial").style.display = "none";
    for (cont; clases.length; cont++) {
      var elemento = document.getElementById(`${cont}`);
      elemento.innerHTML = clases[cont].nombreCancion;
      elemento.style.display = "block";
    }
  }
}

function borrarClases() {
  localStorage.clear();
  document.getElementById("id01").style.display = "none";
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

function mostrarClase(num) {
  var clases = JSON.parse(localStorage.getItem("clases"));
  const urlImagen = clases[num].tab;
  document.getElementById("img").src = urlImagen;
}
