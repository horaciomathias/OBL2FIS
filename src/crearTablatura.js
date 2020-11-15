function validateForm() {
  var x;
  valido = true;
  x = document.forms["myForm"]["autor"].value;
  if (x == "" || x == null) {
    alert("Debe completar el nombre");
    return false;
  }

  valido = validateFileTab();
  if (valido) {
    validateFileSong();
  }

  agregarClase();
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
    extensionesPermitidas = [".mp4", ".mp3", ".wav"];

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
    }
  }
}

class Clase {
  constructor(tab, cancion) {
    this.Tablatura = tab;
    this.cancion = cancion;
  }
}

function agregarClase() {
  var tab = docudocument.forms["myForm"]["tabFile"];
  var cancion = document.forms["myForm"]["songFile"];

  document.getElementById("demo").innerHTML = fruits.toString();
  var clase = { tab, cancion };
}
