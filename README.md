# EURL-SASU

Ce bout de code sert à déterminer vos prélèvements (cotisations sociales, impôt société, impôt sur le revenu) dans le cadre d'une EURL ou d'une SASU à l'IS, avec prise en compte éventuelle de l'ACCRE.  

Les lois et règlements pris en compte sont ceux applicables en 2017. L'interface permet de visualiser facilement les divers montants, et surtout il affiche le revenu en super-net : ce qui vous reste réellement dans la poche. De la documentation permet de comprendre le fonctionnemet et les calculs (visez les petit points d'interrogation).   

## Installation et usage

Après clone ou download : 

    npm install
    npm start

Vous pouvez ensuite ouvrir le fichier index.html avec votre navigateur favori (pas besoin de lancer un serveur local).

## Côté code

Typescript 2.1.6, Angular 1.6, Webpack 2.2.1, Bootstrap 3.  
N'hésitez pas à forker, améliorer et faire des PR, je pense que ça pourra être utile à pas mal de monde.

Vous trouverez dans le code les différentes références utilisées pour les calculs. La documentation est au format Markdown dans le fichier doc.ts. Elle est assez succincte pour l'heure et n'attend que vous pour s'étoffer. 

 