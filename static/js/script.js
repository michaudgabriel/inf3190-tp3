/**
 * Cette methode permet de verifier qu'un champ ne contient aucune virgule.
 *
 * @param valeur la valeur du champ
 * @param le id ou il faut ecrire les messages d'erreurs
 * @return true si il n'y a aucune virgule dans la valeur du champ, sinon false
 */
function verifierVirgules(valeur, champ_invalide) {
    let i = 0;
    let valide = true;
    while (valide && i < valeur.length) { 
        if(valeur.charAt(i) === ',') {
            document.getElementById(champ_invalide).innerHTML = "Le champ ne doit pas contenir de virgule ( , );
            valide = false;
	}
        i++; 
    }
    return valide;
}
/**
 * Cette methode permet de verifier que le nom entre est valide.
 *
 * @return true si le nom est valide, sinon false
 */
function validerNom() {
    let valide = true;
    let virgule = true;
    let nom = document.getElementById("nom");
    if (nom.length = 0 ) {
        document.getElementById("nom_invalide").innerHTML = "Le champ est obligatoire";
	valide = false;
    } else if (nom.length < 3 || nom.length > 20) {
        document.getElementById("nom_invalide").innerHTML = "Le nom doit être composé de 3 à 20 lettre";
	valide = false;
    } else {
	virgule = verifierVirgules(nom, "nom_invalide");
    }
    return (valide && virgule);
}
/**
 *
 *
 */
function validerAge(valide) {
    let virgule = true;
    let age = document.getElementById("age");
    if (age.leng
}
/**
 * Cette methode permet de valider qu'un champ est rempli, ne depasse pas un certain nombre de 
 * characteres et ne contient aucune virgules.
 *
 * @param champ Le nom du champ que l'on souhaite valider de type chaine de characteres
 * @param max le nombre maximal de characteres acceptes pour le champ
 * @param valide la validite du formulaire pour l'instant
 * @return un booleen representant la validite du formulaire apres la validation du champ present
 */
function validerChamp(champ, max, valide) {
    let virgule = true;
    let valeur = document.getElementById(champ);
    if (champ.length == 0 ) {
        document.getElementById(champ + "_invalide").innerHTML = "Le champ est obligatoire";
	valide = false;
    } else if (champ.length > max){
        document.getElementById(champ + "_invalide").innerHTML = "Le champ ne peut pas contenir plus de " + max + " charactères";
    } else {
	virgule = verifierVirgules(valeur, champ + "_invalide");
    }
    return (valide && virgule);
}
/**
 * Cette methode permet de verifier le format d'une adresse courriel.
 * Le code a ete pris a lien ci-dessous :
 * https://stackoverflow.com/a/920456
 *
 * @return true si l'adresse courriel correspond a l'expression reguliere, sinon false
 */
function verifierFormatCourriel() {
    let email = document.getElementById("email");
    let expression = /\S+@\S+\.\S+/;
    valide = expression.test(email); 
    if (!valide) {
        document.getElementById("email_invalide").innerHTML = "Le format de l'adresse courriel est invalide";
    }
    return valide;
}
/**
 * Cette methode permet de valider l'email entre
 *
 * @param valide la validite du formulaire pour l'instant
 * @return un booleen representant la validite du formulaire apres la validation du champ present
 */
function validerEmail(valide) {
    let format = true;
    valide = validerChamp("email", 80, valide);
    if (valide) {
        format = verifierFormatCourriel();
    }
    return (valide && format);
}
/**
 * Cette methode permet de valider le formulaire entre par l'utilisateur.
 * Un message d'erreur explicatif est afficher a cote de chaque champ non valide lors de la soumission.
 *
 * return true si tous les champs sont valides, sinon false
 */
function validerFormulaire() {
    let valide = validerNom();
    valide = validerChamp("espece", 25, valide);
    valide = validerChamp("race", 25, valide);
    valide = validerChamp("description", 200, valide);
    valide = validerEmail();
    valide = validerChamp("ville", 50, valide);
    valide = validerChamp("adresse", 50, valide);
}
