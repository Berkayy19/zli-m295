const addiere1 = function(zahl1, zahl2) {
    return zahl1 + zahl2;
}

function addiere2(zahl1, zahl2) {
    return zahl1 + zahl2;  //Addiere2 kann auch über der funktion ausgeführ werden und addiere1 nicht
}

const addiere3 = (zahl1, zahl2) => zahl1 + zahl2;  //Gleicher Fall

var x = 10; //Wird gehoistet, ganz oben hingetan, kann nochmal deklariert werden, kann wert nochmal ändern
const x1 = 10; //wird nicht gehoistet und ist sicher, kann nicht nochmal deklariert werden, man sagt der wert kann nicht geändert werden

