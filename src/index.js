class tablatura {
  constructor(tab, nombreAutor) {
    this.tab = tab;
    this.nombreAutor = nombreAutor;
  }
}

class song {
  constructor(cancion, nombreCancion) {
    this.cancion = cancion;
    this.nombreCancion = nombreCancion;
  }
}

class clase {
  constructor(tablatura, song) {
    this.tablatura = tablatura;
    this.song = song;
  }
}

function validarString(unString) {
  var retorno;
  if (unString == "" || unString == null) {
    retorno = false;
  } else {
    retorno = true;
  }
  return retorno;
}

function validateForm() {
  var nombreAutor = document.forms["formulario"]["autor"].value;
  valido = validarString(nombreAutor);

  if (valido) {
    var nombreCancion = document.forms["formulario"]["song"].value;
    var valido = validarString(nombreCancion);

    if (valido) {
      var archivoTab;
      archivoTab = document.forms["formulario"]["tabFile"].value;
      valido = validateFileTab(archivoTab);

      if (valido) {
        var archivoCancion;
        archivoCancion = document.forms["formulario"]["songFile"].value;
        valido = validateFileSong(archivoCancion);
      }
    } else {
      alert("Debe completar el nombre de la canción");
    }
  } else {
    alert("Debe completar el nombre del autor");
  }

  if (valido) {
    var agregada = agregarClase(tab, cancion, nombreAutor, nombreCancion);
    if (agregada) {
      alert("Tablatura agregada exitosamente");
    } else {
      alert("ERROR:\nNo se pudo agregar la clase");
    }
  }
  return valido;
}

function validateFileTab(archivoTab) {
  var retorno;
  if (!validarString(archivoTab)) {
    alert("Debe seleccionar un archivo de tablatura");
    retorno = false;
  } else {
    //Verificacion de extension permitida
    var ext = archivoTab.substring(archivoTab.lastIndexOf(".")).toLowerCase();
    extensionesPermitidasTab = [".jpg", ".png"];
    extensionPermitida = false;
    for (var i = 0; i < extensionesPermitidasTab.length; i++) {
      if (extensionesPermitidasTab[i] == ext) {
        extensionPermitida = true;
        break;
      }
    }

    if (!extensionPermitida) {
      alert("Extension de tablatura no permitida: " + ext);
      retorno = false;
    } else {
      retorno = true;
    }
  }
  return retorno;
}

function validateFileSong(archivoCancion) {
  var retorno;
  if (!validarString(archivoCancion)) {
    alert("Debe seleccionar una canción");
    retorno = false;
  } else {
    //Verificacion de extension permitida
    var ext = archivoCancion
      .substring(archivoCancion.lastIndexOf("."))
      .toLowerCase();
    extensionesPermitidas = [".mp3", ".ogg", ".m4a"];

    extensionPermitida = false;
    for (var i = 0; i < extensionesPermitidas.length; i++) {
      if (extensionesPermitidas[i] == ext) {
        extensionPermitida = true;
        break;
      }
    }

    if (!extensionPermitida) {
      alert("Extension de canción no permitida: " + ext);
      retorno = false;
    } else {
      retorno = true;
    }
  }
  return retorno;
}

var tab;
var uploadTab = function (event) {
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.addEventListener("load", () => {
    tab = reader.result;
  });
};

var cancion;

var uploadSong = function (event) {
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.addEventListener("load", () => {
    cancion = reader.result;
  });
};

function agregarClase(tab, cancion, nombreAutor, nombreCancion) {
  let tablaturaClase = new tablatura(tab, nombreAutor);
  let cancionClase = new song(cancion, nombreCancion);
  let leccion = new clase(tablaturaClase, cancionClase);
  var clasesGuardadas = JSON.parse(localStorage.getItem("clases"));
  if (clasesGuardadas == null || clasesGuardadas == "") {
    clasesGuardadas = [];
  }
  if (clasesGuardadas.length >= 20) {
    alert(
      "Máximo de clases permitidas alcanzado\nIntente borrar clases y luego creee nuevamente la tablatura"
    );
    return false;
  } else {
    clasesGuardadas.push(leccion);
    localStorage.setItem("clases", JSON.stringify(clasesGuardadas));
    return true;
  }
}

function listarClases() {
  var clases = JSON.parse(localStorage.getItem("clases"));
  var cont = 0;
  if (clases == null || clases.length == 0) {
    document.getElementById("textoInicial").style.display = "block";
  } else {
    document.getElementById("textoInicial").style.display = "none";
    for (cont; clases.length; cont++) {
      var elemento = document.getElementById(`${cont}`);
      elemento.innerHTML = clases[cont].song.nombreCancion;
      elemento.style.display = "block";
    }
  }
}

function borrarClases() {
  localStorage.clear();
  document.getElementById("id01").style.display = "none";
  alert("Clases Borradas");
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
  const urlImagen = clases[num].tablatura.tab;
  const urlAudio = clases[num].song.cancion;
  document.getElementById("img").src = urlImagen;

  var reproductor = document.getElementById("contenedorReproductor");
  reproductor.style.display = "block";
  var link = document.createElement("source");
  link.src = urlAudio;

  var sound = document.getElementById("audio");
  sound.id = "audio-player";
  sound.controls = "controls";
  link.src = urlAudio;
  sound.type = "audio/mpeg";
  sound.appendChild(link);
}

module.exports = {
  mostrarClase: mostrarClase,
  cerrarModal: cerrarModal,
  modalClases: modalClases,
  borrarClases: borrarClases,
  listarClases: listarClases,
  agregarClase: agregarClase,
  uploadSong: uploadSong,
  uploadTab: uploadTab,
  validateFileSong: validateFileSong,
  validateFileTab: validateFileTab,
  validateForm: validateForm,
  validarString: validarString,
};
