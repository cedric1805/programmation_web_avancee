var defil = null;
var longueur_pont = null;
var pas_vertical = 10;




window.onload = function() {
    init();
    //deplacement_pont();

}

function init() {
    var bouton_jouer = document.getElementById('jouer');
    //definition des variables
    //------------------------------------------------------------------
    var hauteur_plateformeGauche = 100; // fixe
    var longueur_plateformeGauche = 200; // fixe

    var longueur_pont = 0;
    var largeur_pont = 10; //fixe

    var hauteur_plateformeDroite = (hauteur_plateformeGauche - largeur_pont) ; // fixe
    var longueur_plateformeDroite = 400;
    //------------------------------------------------------------------
    //------------------------------------------------------------------
    bouton_jouer.onclick = function() {

        //creation objets
        //------------------------------------------------------------------
        //creation des deux plateformes 
        plateformeDroite_Div = document.createElement('div');
        plateformeDroite_Div.id = 'plateformeDroite'; 
        plateformeDroite_Div.style.border = '1px solid black';
        plateformeDroite_Div.innerHTML = 'plateforme droite !';
        plateformeDroite_Div.style.position = "absolute";

        plateformeGauche_Div = document.createElement('div');
        plateformeGauche_Div.id = 'plateformeGauche'; 
        plateformeGauche_Div.style.border = '1px solid black';
        plateformeGauche_Div.innerHTML = 'plateforme gauche !';
        plateformeGauche_Div.style.position = "absolute";

        //creation du pont
        pont_Div = document.createElement('div');
        pont_Div.id = 'pont'; 
        pont_Div.style.border = '1px solid black';
        pont_Div.innerHTML = 'le pont !';
        pont_Div.style.position = "absolute";
        //------------------------------------------------------------------
        //------------------------------------------------------------------

        //positions et tailles objets
        //------------------------------------------------------------------
        //positions et tailles des deux plateformes
        plateformeDroite_Div.style.width = longueur_plateformeDroite + 'px';
        plateformeDroite_Div.style.height = hauteur_plateformeDroite + 'px';
        plateformeDroite_Div.style.right = 0 + 'px';
        plateformeDroite_Div.style.bottom = 0 + 'px';

        plateformeGauche_Div.style.width = longueur_plateformeGauche + 'px';
        plateformeGauche_Div.style.height = hauteur_plateformeGauche + 'px';
        plateformeGauche_Div.style.left = 0 + 'px';
        plateformeGauche_Div.style.bottom = 0 + 'px';

        //position et taille du pont
        pont_Div.style.width = largeur_pont + 'px';
        pont_Div.style.height = longueur_pont + 'px';
        pont_Div.style.left = longueur_plateformeGauche + 'px';
        pont_Div.style.bottom = hauteur_plateformeGauche + 'px';
        //------------------------------------------------------------------
        //------------------------------------------------------------------

        //insertion objets dans le jeux
        //------------------------------------------------------------------
        jeux_Div = document.getElementById('jeux');
        jeux_Div.appendChild(plateformeDroite_Div);
        jeux_Div.appendChild(plateformeGauche_Div);
        jeux_Div.appendChild(pont_Div);

        score_Div = document.getElementById('score');
        score_Div.innerHTML = 'En avant !';

        global_Div = document.getElementById('global');
        //------------------------------------------------------------------
        //------------------------------------------------------------------


        //console.log(pont_Div.style.height); //recupere longueur du pont
        deplacement_pont();
   };
}




function deplacement_pont() {

    global_Div.addEventListener("mousedown", function(event){     
        defil = setInterval(agrandir_pont,50);
    }, false);


    document.addEventListener("mouseup", function(event){
        clearInterval(defil);
        //console.log(pont_Div.style.height); //recupere longueur du pont 
        pivoter_pont();

    }, false);




};

function agrandir_pont(){
    longueur_pont = longueur_pont + pas_vertical;
    pont_Div.style.height = longueur_pont +  'px';
}; 

function pivoter_pont(){
    //on recupere les tailles des elements crees
    //------------------------------------------------------------------
    var taille_pont = document.getElementById("pont").clientHeight ; //on ne prend pas en compte les brdures
    document.getElementById("pont").style.height = taille_pont + "px";
    console.log("la taille_pont est de : " + taille_pont);
    var largeur_jeux = document.getElementById("jeux").clientWidth ; //on ne prend pas en compte les brdures
    document.getElementById("jeux").style.width = largeur_jeux + "px";
    //console.log("la largeur_jeux est de : " + largeur_jeux);
    var hauteur_jeux = document.getElementById("jeux").clientHeight ; //on ne prend pas en compte les brdures
    document.getElementById("jeux").style.height = hauteur_jeux + "px";
    //console.log("la hauteur_jeux est de : " + hauteur_jeux);
    var taille_plateformeGauche = document.getElementById("plateformeGauche").clientWidth ; //on ne prend pas en compte les brdures
    document.getElementById("plateformeGauche").style.width = taille_plateformeGauche + "px";
    //console.log("la taille_plateformeGauche est de : " + taille_plateformeGauche);
    var hauteur_plateformeGauche = document.getElementById("plateformeGauche").clientHeight ; //on ne prend pas en compte les brdures
    document.getElementById("plateformeGauche").style.height = hauteur_plateformeGauche + "px";
    //console.log("la hauteur_plateformeGauche est de : " + hauteur_plateformeGauche);
    var taille_plateformeDroite = document.getElementById("plateformeDroite").clientWidth ; //on ne prend pas en compte les brdures
    document.getElementById("plateformeDroite").style.width = taille_plateformeDroite + "px";
    //console.log("la taille_plateformeDroite est de : " + taille_plateformeDroite);
    var taille_fausse = largeur_jeux - ( taille_plateformeGauche + taille_plateformeDroite ) ;
    //console.log("la taille_fausse est de : " + taille_fausse);
    var taille_pont_max = hauteur_jeux - hauteur_plateformeGauche;
    console.log("la taille_pont_max est de : " + taille_pont_max);
    //------------------------------------------------------------------
    //------------------------------------------------------------------

    //tests suivant la longueur du pont
    //------------------------------------------------------------------
    if ( (taille_pont >= taille_fausse) && (taille_pont < taille_pont_max) ) {
        pont_Div.style.transform = 'rotate(90deg)';
        pont_Div.style.transformOrigin = "left bottom";
        score_Div.innerHTML = 'Bien joué !';
        setTimeout(function(){ niveau_suivant(); }, 1000);
        
    } else {        
        pont_Div.style.transform = 'rotate(180deg)';
        pont_Div.style.transformOrigin = "left bottom";
        score_Div.innerHTML = 'Tu es nul !';
        alert("perdu !");
    }
};

function niveau_suivant(){
    score_Div.innerHTML = 'Tu es au niveau : 1 !';
    //initialisation pont
    //------------------------------------------------------------------
    longueur_pont = 0;
    pont_Div.style.transform = 'rotate(0deg)';
    pont_Div.style.transformOrigin = "left bottom";
    pont_Div.style.height = longueur_pont + 'px';
    //------------------------------------------------------------------
    //------------------------------------------------------------------
    //Modification plateforme
    //------------------------------------------------------------------
    //on recupere taille plateforme droite pour la plateforme de gauche
    var taille_plateformeDroite = document.getElementById("plateformeDroite").clientWidth ; //on ne prend pas en compte les brdures
    document.getElementById("plateformeDroite").style.width = taille_plateformeDroite + "px";
    longueur_plateformeGauche = taille_plateformeDroite;
    plateformeGauche_Div.style.width = longueur_plateformeGauche + 'px';
    //------------------------------------------------------------------
    //------------------------------------------------------------------
    //on recalle le pont sur la plateforme de gauche 
    //------------------------------------------------------------------
    pont_Div.style.left = longueur_plateformeGauche + 'px';
    //------------------------------------------------------------------
    //------------------------------------------------------------------
    //on cree aleatoirement la plateforme de droite
    //------------------------------------------------------------------
    var largeur_jeux = document.getElementById("jeux").clientWidth ; //on ne prend pas en compte les brdures
    document.getElementById("jeux").style.width = largeur_jeux + "px";
    var hauteur_jeux = document.getElementById("jeux").clientHeight ; //on ne prend pas en compte les brdures
    document.getElementById("jeux").style.height = hauteur_jeux + "px";
    //console.log("la hauteur_jeux est de : " + hauteur_jeux);
    var hauteur_plateformeGauche = document.getElementById("plateformeGauche").clientHeight ; //on ne prend pas en compte les brdures
    document.getElementById("plateformeGauche").style.height = hauteur_plateformeGauche + "px";
    //console.log("la hauteur_plateformeGauche est de : " + hauteur_plateformeGauche);
    //on prend deux fois la largeur du pont comme marge
    var largeur_pont = document.getElementById("pont").clientWidth ; //on ne prend pas en compte les brdures
    document.getElementById("pont").style.width = hauteur_dispo + "px";
    var taille_max_plateforme_droite = largeur_jeux - (longueur_plateformeGauche + 10*largeur_pont);
    //console.log(taille_max_plateforme_droite);
    var hauteur_dispo = hauteur_jeux - (hauteur_plateformeGauche + 10*largeur_pont) ;
    //console.log("la taille_fausse est de : " + taille_fausse);
    //on affecte une valeur aleatoire ne depassant pas taille_max_plateforme_droite et la hauteur disponible dans le jeux
    var mini_long = Math.min(taille_max_plateforme_droite,hauteur_dispo);
    console.log("mini_long = " + mini_long);
    var longueur_fausse = Math.random() * mini_long; 
    console.log("longueur_fausse = " + longueur_fausse);

    var longueur_plateformeDroite = Math.random() * (largeur_jeux - (longueur_fausse+longueur_plateformeGauche))


    plateformeDroite_Div.style.width = longueur_plateformeDroite + 'px';
    //------------------------------------------------------------------
    //------------------------------------------------------------------



    
    
    
}

