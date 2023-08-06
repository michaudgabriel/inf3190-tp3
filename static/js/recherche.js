let entree = document.getElementById("bar");
entree.addEventListener("keyup", function(event) {
   if (event.key === "Enter" && entree.value.length > 0) {
        window.location.href = "/liste_animal/" + document.getElementById("bar").value.toLowerCase();
    }
});
