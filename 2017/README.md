# EURL-SASU (revenus 2017)

Ce bout de code est à destination des freelances qui facturent leurs prestations à la journée (mais il peut aussi être utile aux entrepreneurs en général). Il sert à déterminer vos prélèvements (cotisations sociales, impôt société, impôt sur le revenu) dans le cadre d'une EURL ou d'une SASU à l'IS, avec prise en compte éventuelle de l'ACCRE.

Les lois et règlements pris en compte sont ceux applicables en 2017. L'interface est basée sur des sliders, et permet de visualiser facilement les divers montants. De la documentation permet de comprendre le fonctionnement et les calculs : visez les petit points d'interrogation.

Voici les paramètres/variables que vous pouvez modifier :

- Capital social de l'entreprise (nécessaire pour le calcul de la fiscalité des dividendes)
- Charges de l'entreprise
- TJ moyen
- Nombre jours payés dans l'exercice
- Rémunérations/salaires versés
- Dividendes versés
- Autres revenus (autre salaire, indemnités chômage, retraite, etc.)
- Nombre de parts du foyer fiscal pour l'impôt sur le revenu
- Application de l'ACCRE
- EURL ou SASU

## Je veux jouer tout de suite !

Cliquez ici : [http://www.antoineviau.com/eurl-sasu/2017](http://www.antoineviau.com/eurl-sasu/2017)

## Installation et usage

Après clone ou download :

    npm install
    npm run build
    npm run serve

Pour produire une version minifiée (environ 350 Kb au lieu de 1,5 Mb) :

    npm run build:prod

**ATTENTION**  
Il n'y a aucun "blindage" contre des valeurs incohérentes. Par exemple, si vous vous versez plus de dividendes que possible, aucun message d'erreur ne s'affichera. Toutefois, les réultats seront suffisamment bizarres pour que ça saute aux yeux (typiquement : des nombres négatifs).  
De manière générale :

- réglez les paramètres d'entrée d'argent (capital, TJ, jours, autres revenus) et situationnel (nombre de parts)
- puis faites varier ceux de sortie (charges, rémunération, dividendes, etc.)

**Le plus simple est de regarder la valeur _Reste en société_ et de s'assurer qu'elle n'est jamais négative.**

## Côté code

Typescript 2.1.6, Angular 1.6, Webpack 2.2.1, Bootstrap 3.  
N'hésitez pas à forker, améliorer et faire des PR, je pense que ça pourra être utile à pas mal de monde.

Vous trouverez dans le code les différentes références utilisées pour les calculs. La documentation est au format Markdown dans le fichier doc.ts. Elle n'attend que vous pour s'étoffer.
