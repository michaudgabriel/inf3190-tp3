/**
 * Cette methode permet de verifier qu'un champ ne contient aucune virgule.
 *
 * @param valeur la valeur du champ
 * @param champ_invalide le id ou il faut ecrire les messages d'erreurs
 * @return true si il n'y a aucune virgule dans la valeur du champ, sinon false
 */
function verifierVirgules(valeur, champ_invalide) {
    let i = 0;
    let valide = true;
    while (valide && i < valeur.length) { 
        if(valeur.charAt(i) === ',') {
            document.getElementById(champ_invalide).innerHTML = "Le champ ne doit pas contenir de virgule ( , )";
            valide = false;
	}
        i++; 
    }
    return valide;
}
/**
 * Cette methode permet de valider qu'un champ est rempli, ne depasse pas un certain nombre de
 * characteres et ne contient aucune virgules.
 *
 * @param champ Le nom du champ que l'on souhaite valider de type chaine de characteres
 * @param champInvalide Le id qui conteint les messages en cas d'erreurs
 * @param max le nombre maximal de characteres acceptes pour le champ
 * @param valide la validite du formulaire pour l'instant
 * @return un booleen representant la validite du formulaire apres la validation du champ present
 */
function validerChamp(champ, champInvalide, max, valide) {
    let virgule = true;
    let valeur = document.getElementById(champ).value;
    if (valeur.length === 0 ) {
        document.getElementById(champInvalide).innerHTML = "Le champ est obligatoire";
        valide = false;
    } else if (valeur.length > max){
        document.getElementById(champInvalide).innerHTML = "Le champ ne peut pas contenir plus de " + max + " charactères";
    } else {
        virgule = verifierVirgules(valeur, champInvalide);
    }
    return (valide && virgule);
}
/**
 * Cette methode permet de verifier que le nom entre est valide.
 *
 * @return true si le nom est valide, sinon false
 */
function validerNom() {
    let longueur = true;
    let valide = validerChamp("nom", "nom_invalide", 20, true);
    if (valide) {
        let nom = document.getElementById("nom").value;
        if (nom.length < 3) {
            document.getElementById("nom_invalide").innerHTML = "Le nom doit être composé de 3 à 20 lettre";
	    longueur = false;
        } else {
            document.getElementById("nom_invalide").innerHTML = "";
    }
    return (valide && longueur);
}
/**
 * Cette methode permet de valider que l'âge est bien un nombre entre 0 et 30 ans.
 * 
 * @param valide la validite du formulaire pour l'instant
 * @return un booleen representant la validite du formulaire apres la validation du champ present
 */
function validerAge(valide) {
    let nombre = true;
    valide = validerChamp("age", "age_invalide", 2, valide);
    if (valide) {
        let age = document.getElementById("age").value;
        if(isNaN(age) || age < 0 || age > 30) {
            document.getElementById("age_invalide").innerHTML = "L'âge de l'animal doit être entre 0 et 30 ans";
	    nombre = false;
	}
    }
    return (valide && nombre);
}
/**
 * Cette methode permet de verifier le format d'une adresse courriel.
 * Le code a ete pris a lien ci-dessous :
 * https://stackoverflow.com/a/920456
 *
 * @return true si l'adresse courriel correspond a l'expression reguliere, sinon false
 */
function verifierFormatCourriel() {
    let email = document.getElementById("email").value;
    let expression = /\S+@\S+\.\S+/;
    let valide = expression.test(email);
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
    valide = validerChamp("courriel", "courriel_invalide", 80, valide);
    if (valide) {
        format = verifierFormatCourriel();
    }
    return (valide && format);
}
/**
 * Cette methode permet de valider le code postal selon le format canadien.
 * Le format canadien est : 'A0A 0A0'. Le code postal doit contenir aucune des lettres suivantes :
 * D, F, O, Q, U et ne doit pas commencer avec un Z ou un W. 
 * Les lettres minuscules ne sont pas acceptees.
 *
 * @param cp le code postal a valider
 * @return true si le code postal est valide, sinon false
 */
function estCodePostalValide(cp) {
    let expression = /^(?![DFIOQUWZ])[A-Z]\d(?![DFIOQU])[A-Z]' '\d(?![DFIOQU])[A-Z]\d$/;
    return expression.test(cp);
}
/**
 * Cette methode permet de valider le code postal entre.
 *
 * @param valide la validite du formulaire pour l'instant
 * @return un booleen representant la validite du formulaire apres la validation du champ present 
 */
function validerCodePostal(valide) {
    valide = validerChamp("cp", "cp_invalide", 7, valide);
    if (valide) {
        let cp = document.getElementById("cp").value;
	if (cp.length !== 7 || !estCodePostalValide) {
            document.getElementById("cp_invalide").innerHTML = "Le format requis est : \'A0A 0A0\'";
	    valide = false
	}
    }
    return valide;
}
/**
 * Cette methode permet de valider le formulaire entre par l'utilisateur.
 * Un message d'erreur explicatif est afficher a cote de chaque champ non valide lors de la soumission.
 *
 * return true si tous les champs sont valides, sinon false
 */
function validerFormulaire() {
    let valide = validerNom();
    valide = validerChamp("espece", "espece_invalide", 25, valide);
    valide = validerChamp("race", "race_invalide", 25, valide);
    valide = validerAge(valide);
    valide = validerEmail(valide);
    valide = validerChamp("ville", "ville_invalide", 50, valide);
    valide = validerChamp("adresse", "adresse_invalide", 50, valide);
    valide = validerCodePostal(valide);
    document.getElementById("cp_invalide").innerHTML = "" + valide;
    return validerChamp("description", "description_invalide",200, valide);
}
