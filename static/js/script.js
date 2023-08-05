/**
 *
 *
 *
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
 *
 *
 */
function validerNom() {
    let valide = true;
    let virgule = true;
    let nom = document.getElementById("nom");
    if (nom.length < 3 || nom.length > 20) {
        document.getElementById("nom_invalide").innerHTML = "Le nom doit être composé de 3 à 20 lettre";
	valide = false;
    } else {
	virgule = verifierVirgules(nom, "nom_invalide");
    }
    return (valide && virgule);
}
/**
 * Cette methode permet de valider les champs : espece, race, description, adresse et ville
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
 * @param email le email a valider
 * @return true si l'adresse courriel correspond a l'expression reguliere, sinon faux
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
 *
 *
 */
function validerEmail(valide) {
    valide = validerChamp("email", 80, valide);
    let format = verifierFormatCourriel();
    return (valide && format);
}
/**
 *
 *
 *
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
