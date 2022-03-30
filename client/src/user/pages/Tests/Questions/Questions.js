import React from 'react';
import image1 from './feu_TourneDroite.jpg'
import image2 from './Reaction.jpg'
import image3 from './corrosif.jpg'
import image4 from './Derapage.jpg'
import image5 from './passe1.jpg'
import image6 from "./ceder.jpg"
import image7 from "./Stop.jpg"
import image8 from "./cedezlepassage.jpg"
import image9 from "./doubleSens.jpg"
import image10 from "./drivingCity.jpg"
import image11 from './finPriorite.JPG'
import image12 from './assistance.jpg'
import image13 from './cassis.JPG'
import image14 from './alcool.jpg'
import image15 from './pluie.jpg'
import image16 from './ligneContinue.jpg'
import image17 from './passageP.jpg'
import image18 from './stationnement.jpg'
import image19 from './profondeur.jpg'
import image20 from './ceinture.jpg'
import image21 from './toit.jpg'
import image22 from './Virage.JPG'
import image23 from './filtre.jpg'
import image24 from './autoroute.jpg'
import image25 from './accident.jpg'
import image26 from './interdiction.png'
import image27 from './stationInterdit.jpg'
import image28 from './isItOk.jpg'
import image29 from './90.jpg'
import image30 from './distance.jpg'
import image from './AreYouReadyOuiNon.jpg'

const Questions = [
  {
    image: image1,
    question: 'Le feu de circulation de droite clignote. Il est en panne. Pour tourner à droite : ',
    answerOptions: [
      { option: "Je m'arrête", isCorrect: false },
      { option: 'Je passe avec prudence', isCorrect: true },
    ],
  },
  {
    image: image2,
    question: 'Le temps de réaction chez une personne en bonne santé est en moyenne : ',
    
    answerOptions: [
      { option: "1 seconde", isCorrect: true },
      { option: "5 secondes", isCorrect: false },
      { option: '3 secondes', isCorrect: false },
    ],
  },
  {
    image: image3,
    question: 'Cette étiquette en noir et blanc indique que ce camion transposte une matière : ',
   
    answerOptions: [
      { option: "Toxique", isCorrect: false },
      { option: "Infectueuse", isCorrect: false },
      { option: 'Corrosive', isCorrect: true },
    ],
  },
  {
    image: image4,
    question: 'Je dois tenir compte de ce panneau uniquement : ',
   
    answerOptions: [
      { option: "Lorque la chaussée est mouillé", isCorrect: false },
      { option: "Lorsque la chaussée est sèche", isCorrect: false },
      { option: 'Dans les deux cas', isCorrect: true },
    ],
  },
  {
    image: image5,
    question: "Tous les véhicules se dirigent tout droit. Quel est l'ordre de passage de ses voitures : ",
  
    answerOptions: [
      { option: "jaune, rouge, bleue", isCorrect: false },
      { option: "jaune, bleue, rouge", isCorrect: true },
      { option: 'rouge, jaune, bleue', isCorrect: false },
    ],
  },
  {
    image: image6,
    question: 'Dans cette situation, la voiture bleue : ',
    
    answerOptions: [
      { option: "passe avec prudence", isCorrect: false },
      { option: "cède le passage à droite et passe", isCorrect: false },
      { option: "s'arrête et cède le passage à droite et à gauche", isCorrect: true },
    ],
  },
  {
    image: image6,
    question: "La voiture jaune tourne à sa gauche, quel est l'ordre du passage des voitures : ",
    
    answerOptions: [
      { option: "Jaune, rouge, bleue", isCorrect: false },
      { option: "Rouge, bleue, jaune", isCorrect: true },
      { option: 'Bleue, rouge, jaune', isCorrect: false },
    ],
  },
  {
    image: image7,
    question: "Au STOP, je m'arrête : ",
   
    answerOptions: [
      { option: "à la hauteur du panneau", isCorrect: false },
      { option: 'à la limite de la chaussée abordée', isCorrect: true },
    ],
  },
  {
    image: image8,
    question: 'Le cédez le passage : ',
   
    answerOptions: [
      { option: "On doit céder le passage à droite et à gauche", isCorrect: true },
      { option: "On s'arrête même si la route est libre", isCorrect: false },
      { option: 'On doit cédez le passage à droite et passer', isCorrect: false },
    ],
  },
  {
    image: image9,
    question: 'Ce panneau indique que la circulation est à double sens : ',
   
    answerOptions: [
      { option: "à 50m du panneau", isCorrect: false },
      { option: "à partir du panneau", isCorrect: true },
      { option: 'à 150m du panneau', isCorrect: false },
    ],
  },
  {
    image: image10,
    question: "Ma vitesse est 90 km/h, la distance d'arrêt est : ",
   
    answerOptions: [
      { option: "81 m", isCorrect: true },
      { option: "27 m", isCorrect: false },
      { option: '120 m', isCorrect: false },
    ],
  },
  {
    image: image11,
    question: 'Ce panneau indique : ',
    
    answerOptions: [
      { option: "Interdiction de stationnement", isCorrect: false },
      { option: "Fin de route à caratère prioritaire", isCorrect: true },
      { option: 'Route prioritaire', isCorrect: false },
    ],
  },
  {
    image: image12,
    question: "Ce véhicule est prioritaire lorsqu'il utilise ses avertisseurs lumineux : ",
   
    answerOptions: [
      { option: "Oui", isCorrect: false },
      { option: 'Non', isCorrect: true },
    ],
  },
  {
    image: image13,
    question: 'Ce panneau indique : ',
    
    answerOptions: [
      { option: "Un cassis ou un dos d'âne", isCorrect: true },
      { option: "Un ralentisseur", isCorrect: false },
      { option: 'Un virage', isCorrect: false },
    ],
  },
  {
    image: image14,
    question: "Le refus de se soumettre à la procédure relative à la preuve de l'état alcoolique entraîne : ",
   
    answerOptions: [
      { option: "La mise du véhicule en fourrière", isCorrect: false },
      { option: "Le retrait de 3 points", isCorrect: false },
      { option: 'Le retrait immédiat du permis de conduite', isCorrect: true },
    ],
  },
  {
    image: image15,
    question: "Par ce temps, l'adhérence du véhicule : ",
    
    answerOptions: [
      { option: "Ne change pas", isCorrect: false },
      { option: "Diminue", isCorrect: true },
      { option: 'Augmente', isCorrect: false },
    ],
  },
  {
    image: image16,
    question: "Franchir la ligne continue pour dépasser cette voiture entraîne : ",
    
    answerOptions: [
      { option: "Une amende", isCorrect: true },
      { option: "l'emprisonnement du conducteur pour une durée d'une semaine", isCorrect: false },
      { option: 'Le retrait du permis', isCorrect: false },
    ],
  },
  {
    image: image17,
    question: 'Sur le passage piéton : ',
    
    answerOptions: [
      { option: "Je peut m'arrête", isCorrect: false },
      { option: "Je peux stationner", isCorrect: false },
      { option: "Je peux ni m'arrêter ni stationner", isCorrect: true },
    ],
  },
  {
    image: image18,
    question: 'Un stationnement abusif, si on laisse un véhicule stationné pendant plus de : ',

    answerOptions: [
      { option: "5 jours", isCorrect: false },
      { option: "10 jours", isCorrect: false },
      { option: '7 jours', isCorrect: true },
    ],
  },
  {
    image: image19,
    question: 'La hauteur de gomme minimum légale est de : ',
   
    answerOptions: [
      { option: "1 mm", isCorrect: false },
      { option: "2.2 mm", isCorrect: false },
      { option: '1.6 mm', isCorrect: true },
    ],
  },
  {
    image: image20,
    question: 'Ne pas porter sa ceiture de sécurité à l’intérieur et à l’extérieur des agglomérations et sur les autoroutes, entaîne : ',
   
    answerOptions: [
      { option: "Une amende de 40DT", isCorrect: true },
      { option: "Le retrait du permis de conduite", isCorrect: false },
      { option: 'La perte de 3 points sur le permis', isCorrect: false },
    ],

  },
  {
    image: image21,
    question: "Une voiture à toit chargé augmente sa consommation en carburant",
   
    answerOptions: [
      { option: "Oui", isCorrect: true },
      { option: "Non", isCorrect: false },
    ],
  },
  {
    image: image22,
    question: "Ce panneau signifie : ",
   
    answerOptions: [
      { option: "Un virage", isCorrect: false },
      { option: "Une succession de virage dont le premier est à droite", isCorrect: true },
      { option: 'Une succession de virage dont le premier est à gauche dans 800m', isCorrect: false },
    ],
  },
  {
    image: image23,
    question: "Le filtre à air sert à : ", 
    
    answerOptions: [
      { option: "Refroidir le moteur de la véhicule", isCorrect: false },
      { option: "éliminer les imputés pour ne pas passer au moteur", isCorrect: true },
      { option: "nettoyer le carburant avant de l'envoyer au moteur", isCorrect: false },
    ],
  },
  {
    image: image24,
    question: 'Conduire à 110km/h dans un autoroute, je dois : ',
   
    answerOptions: [
      { option: "rester sur la voie droite", isCorrect: false },
      { option: "rester sur la voie gauche", isCorrect: false },
      { option: 'conduire sur la voie au milieu', isCorrect: true },
    ],
  },
  {
    image: image25,
    question: "En cas d'accident de voiture, il est possible de donner à boire aux blessés : ",
   
    answerOptions: [
      { option: "Oui", isCorrect: false },
      { option: 'Non', isCorrect: true },
    ],
  },
  {
    image: image26,
    question: 'Ce panneau signifie : ',
    answerOptions: [
      { option: "Accès interdit aux véhicules transportant des marchandises polluant les eaux", isCorrect: true },
      { option: "Accès interdit aux véhicules transportant des marchandises dangereuses", isCorrect: false },
      { option: 'Attention aux passages des véhicules transportant des marchandises polluant les eaux', isCorrect: false },
    ],
  },
  {
    image: image27,
    question: 'Ce panneau indique : ',
    
    answerOptions: [
      { option: "Arrêt et stationnement interdits", isCorrect: false },
      { option: "Arrêt interdit à gauche et à droite du panneau", isCorrect: false },
      { option: 'Stationnement interdit à gauche et à droite du panneau', isCorrect: true },
    ],
  },
  {
    image: image28,
    question: 'Le stationnement de la véhicule est il dangeureux : ',
    
    answerOptions: [
      { option: "Oui", isCorrect: true },
      { option: "Non", isCorrect: false },
    ],
  },
  {
    image: image29,
    question: 'La voiture devant moi roule à 90km/h, est ce possible de la dépasser : ',
   
    answerOptions: [
      { option: "Oui", isCorrect: false },
      { option: 'Non', isCorrect: true },
    ],
  },
  {
    image: image30,
    question: 'La distance entre un véhicule et piéton ou un vélo : ',
    answerOptions: [
      { option: "1.5 m", isCorrect: true },
      { option: "0.5 m", isCorrect: false },
      { option: '2 m', isCorrect: false },
    ],
  },
]

export default Questions