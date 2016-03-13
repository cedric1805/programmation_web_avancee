//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//  
//                    MIND THE GAP 
//
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//Regle du jeux
//------------- 
/*Création d’un jeu de progression entre plateformes. Le but est de créer des ponts de la bonne taille
afin de relier deux plateformes entre-elles. A chaque tour, deux plateformes donc : celle où l’on se
trouve et celle où l’on doit aller. Pendant la durée du clic sur l’écran, un pont (une barre) se crée
verticalement, progressivement de bas en haut, depuis l’extrémité de la première plateforme (gérer
la vitesse de création de cette barre). Lorsque le clic est relâché, le pont créé s’incline (tombe) et
permet d’accéder à la seconde plateforme (ou non). Le pont ne doit ni être trop court, ni trop long.
C’est-à-dire que le pont doit être au minimum égal à la distance séparant les 2 plateformes et au
maximum à la distance égale à l’espace entre les 2 plateformes et la longueur de la seconde
plateforme.
Si le pont est valide, la seconde plateforme devient la première et une nouvelle plateforme arrive (de
taille et de distance aléatoire), on gagne un point. On peut donc rejouer immédiatement en créant
un nouveau pont. Si le pont n’est pas valide, c’est la fin du jeu.
*/


//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//Declaration des variables
//-------------------------
//instruction
var bouton_jouer = null;
var bouton_restart = null;
//jeu
var largeur_jeux = null;
var hauteur_jeux = null;
//pont
var longueur_pont = null;
var largeur_pont = null;
//vitesse creation pont
var defil = null;
var pas_vertical = 10;

//plateformes
var hauteur_plateformeGauche = null;
var longueur_plateformeGauche = null;
var hauteur_plateformeDroite = null;
var longueur_plateformeDroite = null;
var longueur_max_plateformeDroite = null;
var longueur_min_plateformeDroite = null;
var longueur_aleatoire_plateformeDroite = null;
//regles 
var longueur_pont_max = null;
var longueur_pont_min = null;
//score
var score = null;

// souris
var souris = false;
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//Appel des fonctions
//-------------------
window.onload = function() {
    init();
}

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------

//Definitions des fonctions 
//-------------------------
function init() {
    //on recupere les informations utiles concernant l'environnement de jeu 
    bouton_jouer = document.getElementById('jouer');
    bouton_restart = document.getElementById('resart');
    //initialisation des variables
    //----------------------------
    //jeux 
    largeur_jeux = document.getElementById("jeux").clientWidth ; //on ne prend pas en compte les bordures
    hauteur_jeux = document.getElementById("jeux").clientHeight ; //on ne prend pas en compte les bordures 
    score = 0;
    //plateforme gauche
    longueur_plateformeGauche = 400; 
    hauteur_plateformeGauche = 60; // fixe
    //pont
    longueur_pont = 0;
    largeur_pont = 10; //fixe
    //plateforme droite
    hauteur_plateformeDroite = (hauteur_plateformeGauche - largeur_pont) ; // fixe
    longueur_plateformeDroite= 400;
    //------------------------------------------------------------------
    //--------------------------------------------------------------
}    


function jouer(){
    //creation objets
    //---------------
    //creation des deux plateformes 
    plateformeDroite_Div = document.createElement('div');
    plateformeDroite_Div.id = 'plateformeDroite'; 
    plateformeDroite_Div.style.border = '1px solid black';
    plateformeDroite_Div.style.position = "absolute";
    plateformeDroite_Div.style.backgroundColor = '#383127' ;

    plateformeGauche_Div = document.createElement('div');
    plateformeGauche_Div.id = 'plateformeGauche'; 
    plateformeGauche_Div.style.border = '1px solid black';
    plateformeGauche_Div.style.position = "absolute";
    plateformeGauche_Div.style.backgroundColor = '#383127' ;

    //creation du pont
    pont_Div = document.createElement('div');
    pont_Div.id = 'pont'; 
    pont_Div.style.border = '1px solid black';
    pont_Div.style.position = "absolute";
    pont_Div.style.backgroundColor = '#383127' ;
    //------------------------------------------------------------------
    //------------------------------------------------------------------

    //positions et tailles objets
    //---------------------------

    //positions et tailles des deux plateformes
    plateformeDroite_Div.style.width = longueur_plateformeDroite + 'px';
    plateformeDroite_Div.style.height = hauteur_plateformeDroite + 'px';
    plateformeDroite_Div.style.right = 0 + 'px'; 
    plateformeDroite_Div.style.bottom = 0 + 'px';
    


    plateformeGauche_Div.style.width = longueur_plateformeGauche + 'px';
    plateformeGauche_Div.style.height = hauteur_plateformeGauche + 'px';
    plateformeGauche_Div.style.left = 0 + 'px'; // fixe 
    plateformeGauche_Div.style.bottom = 0 + 'px';

    //position et taille du pont
    pont_Div.style.width = largeur_pont + 'px';
    pont_Div.style.height = longueur_pont + 'px';
    pont_Div.style.left = longueur_plateformeGauche + 'px';
    pont_Div.style.bottom = hauteur_plateformeGauche + 'px';
    //------------------------------------------------------------------
    //------------------------------------------------------------------

    //insertion objets dans le jeux
    //-----------------------------
    jeux_Div = document.getElementById('jeux');
    jeux_Div.appendChild(plateformeDroite_Div);
    jeux_Div.appendChild(plateformeGauche_Div);
    jeux_Div.appendChild(pont_Div);

    score_Div = document.getElementById('score');
    score_Div.innerHTML = 'En avant !';

    global_Div = document.getElementById('global');

    deplacement_pont();
};

function deplacement_pont() {
    if (souris === false) {
        souris = true;
        global_Div.addEventListener("mousedown", function(event){     
            defil = setInterval(agrandir_pont,50);
        }, false);

        global_Div.addEventListener("mouseup", function(event){
            clearInterval(defil);
            pivoter_pont();
        }, false);
    }
};


function agrandir_pont(){
    longueur_pont = longueur_pont + pas_vertical;
    pont_Div.style.height = longueur_pont +  'px';
}; 


function pivoter_pont(){
    //regles
    longueur_pont_max = largeur_jeux - longueur_plateformeGauche; 
    longueur_pont_min = largeur_jeux - ( longueur_plateformeGauche + longueur_plateformeDroite); 
    //------------------------------------------------------------------
    //------------------------------------------------------------------
    //tests suivant la longueur du pont
    //------------------------------------------------------------------
    if ( (longueur_pont <= longueur_pont_max) && (longueur_pont >= longueur_pont_min) ) {
        
        score = score + 1;
        pont_Div.style.transform = 'rotate(90deg)';
        pont_Div.style.transformOrigin = "left bottom";
        score_Div.innerHTML = 'Bien joué !';      

        setTimeout(function(){ niveau_suivant(); }, 1500); //on passe au niveau suivant 

    } else if (longueur_pont > longueur_pont_max) {
        pont_Div.style.transform = 'rotate(90deg)';
        pont_Div.style.transformOrigin = "left bottom";
        score_Div.innerHTML = 'Trop long !';
        alert('Ton score est de : ' + score + ' !');
        restart();
        jouer();
        score_Div.innerHTML = 'On continue !';

    } else {
        pont_Div.style.transform = 'rotate(180deg)';
        pont_Div.style.transformOrigin = "left bottom";
        score_Div.innerHTML = "Trop court !";
        alert('Ton score est de : ' + score + ' !');
        restart();
        jouer();
        score_Div.innerHTML = 'On continue !';
    }
};



function niveau_suivant(){
    
    score_Div.innerHTML = 'Tu es au niveau : ' + score + ' !';
    //initialisation pont
    //-------------------
    longueur_pont = 0;
    pont_Div.style.transform = 'rotate(0deg)';
    pont_Div.style.transformOrigin = "left bottom";
    pont_Div.style.height = longueur_pont + 'px';
    
    //Modification des plateformes
    //----------------------------
    //La plateforme de gauche prend la taille de la plateforme de droite
    longueur_plateformeGauche = longueur_plateformeDroite;
    plateformeGauche_Div.style.width = longueur_plateformeGauche + 'px';
    pont_Div.style.left = longueur_plateformeGauche + 'px';

    //on varie aleatoirement la taille de la plateformeDroite
    //on ne doit pas avoir de collision entre la plateforme de droit et celle de gauche
    longueur_max_plateformeDroite = largeur_jeux - longueur_plateformeGauche;
    //on ne doit pas avoir de collision entre le pont et le haut du jeux 
    longueur_min_plateformeDroite = largeur_jeux - longueur_plateformeGauche - hauteur_jeux + hauteur_plateformeGauche;
    longueur_plateformeDroite = Math.random() * (longueur_max_plateformeDroite - longueur_min_plateformeDroite) + longueur_min_plateformeDroite;
    plateformeDroite_Div.style.width = longueur_plateformeDroite + 'px';

}


function restart(){
    //on vide la div jeux
    //-------------------
    // retire tous les enfants d'un de la div jeux 
    score = 0;
    niveau_suivant();
    var element = document.getElementById("jeux");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
}

