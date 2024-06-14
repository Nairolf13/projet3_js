const prompt = require("prompt-sync")()
let replay = false
let attaques = [
    {
        nom: "frappe rapide",
        puissance: 10,
        precision: 1
    },
    {
        nom: "soin",
        puissance: -15,
        precision: 1
    },
    {
        nom: "coup puissant",
        puissance: 20,
        precision: 1
    },
    {
        nom: "frappe devastatrice",
        puissance: 30,
        precision: 1
    }
]
let joueur =
{
    name: "guerrier du feu",
    pv: 100,
    attaque: attaques
}
let ordi =
{
    name: "sombre lutin",
    pv: 100,
    attaque: attaques
}
function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function selectAttack() {
    for (let i = 0; i < joueur.attaque.length; i++) {
        console.log(i + " " + joueur.attaque[i].nom);
    }
    let choice = parseInt(prompt("Quelle attaque tu choisi ? "))
    while (choice < 0 || choice > 3 || isNaN(choice) == true) {
        choice = parseInt(prompt("Quelle attaque tu choisi ? "))
    }
    return joueur.attaque[choice]
}
function attackRandom() {
    let rnd = randomize(0, attaques.length - 1)
    return ordi.attaque[rnd]
}
function atk(atks, luncher, opponnent) {
    if (randomize(0, atks.precision) == atks.precision) {
        console.log(luncher.name + " a lancer " + atks.nom);
        if (atks.puissance < 0) {
            luncher.pv -= atks.puissance
            console.log(luncher.name + " c'est soigné");
        } else {
            opponnent.pv -= atks.puissance
        }
    } else {
        console.log("l'attaque du " + luncher.name + " a échoué");
    }
}
let welcome = prompt("Bienvenue dans ce jeu de combat 1 VS 1 ! Voulez vous lancer le combat o = oui ,n = non: ");
while(welcome != "o" && welcome != "n"){
    welcome = prompt("Veuillez entrer o ou n !!!")
}
if (welcome == 'o') {
    replay = true
}
else if(welcome != "o") {
    welcome = prompt("Est ce que tu es sur de ne pas vouloir jouer ?")
    while(welcome != "o" && welcome != "n"){
        welcome = prompt("Veuillez entrer o ou n !!!")}
    if (welcome == "o" ) {
        console.log("Ok cool t'as vie !!! ")
        console.log("Aller vas te faire une patrouille");
        replay=false
    }
    else if (welcome == "n") {
        replay = true
    }

    else {
        replay = true

    }
}
if (replay == true) {
    while (joueur.pv > 0 || ordi.pv > 0) {
        if (joueur.pv <= 0) {
            console.log("La partie est fini vous n'avez plus de vie !!! ");
            break
        }
        else if (ordi.pv <= 0) {
            console.log("La partie est fini l'ordinateur n'a plus de vie");
            break
        }
        else {
            let attaquechoiceJoueur = selectAttack()
            atk(attaquechoiceJoueur, joueur, ordi)
            let attaquechoiceordi = attackRandom()
            atk(attaquechoiceordi, ordi, joueur)
            console.log("'''''''''''''''''''''''''''''''''''''''''''");
            console.log("Le joueur à " + joueur.pv + " pv et l'ordinateur à " + ordi.pv + "pv!");
            console.log("'''''''''''''''''''''''''''''''''''''''''''");
        }
    }
}




