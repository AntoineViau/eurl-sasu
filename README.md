# EURL-SASU

Ce bout de code est à destination des freelances qui facturent leurs prestations à la journée (mais il peut aussi être utile aux entrepreneurs en général). Il sert à déterminer vos prélèvements (cotisations sociales, impôt société, impôt sur le revenu) dans le cadre d'une EURL ou d'une SASU à l'IS, avec prise en compte éventuelle de l'ACCRE.  

Les lois et règlements pris en compte sont ceux applicables en 2017. L'interface est basée sur des sliders, et permet de visualiser facilement les divers montants. De la documentation permet de comprendre le fonctionnement et les calculs : visez les petit points d'interrogation.   

## Installation et usage

Après clone ou download : 

    npm install
    npm start

Vous pouvez ensuite ouvrir le fichier index.html avec votre navigateur favori (pas besoin de lancer un serveur local).

**ATTENTION**  
Il n'y a pas de "blindages" si vous entrez des valeurs incohérentes. Par exemple, si vous vous versez plus de dividendes que vous ne le pouvez réellement, aucun message d'erreur ne s'affichera. Toutefois, les réultats seront suffisamment bizarres pour que vous en rendiez compte (typiquement : des nombres négatifs).

## Côté code

Typescript 2.1.6, Angular 1.6, Webpack 2.2.1, Bootstrap 3.  
N'hésitez pas à forker, améliorer et faire des PR, je pense que ça pourra être utile à pas mal de monde.

Vous trouverez dans le code les différentes références utilisées pour les calculs. La documentation est au format Markdown dans le fichier doc.ts. Elle est assez succincte pour l'heure et n'attend que vous pour s'étoffer. 

 