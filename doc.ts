export const doc = {
    readme: {
        title: 'En résumé',
        content: `
De façon simplifiée, voici les principaux prélèvements qui sont effectués en France : 

 * les prélèvements nationaux : impôt sur le revenu, impôt sur les sociétés, TVA, taxe sur les produits pétroliers, etc. ; 
 * les prélèvements locaux : taxe d'habitation, taxe foncière, taxe sur les ordures ménagères, etc. ; 
 * les cotisations sociales : santé, retraite, allocations familiales, etc.

Dans le cadre qui nous intéresse les prélèvements qui nous concernent sont :  
 * cotisations sociales ; 
 * impôt sur les sociétés ; 
 * impôt sur le revenu.

A la base nous disposons de deux sources de revenus :

 * La rémunération : c'est ce que vous versez depuis la trésorerie de votre entreprise. C'est considéré comme une charge déductible ;
 * Les dividendes : c'est ce que vous pouvez vous versez en tant qu'actionnaire une fois que vous avez payé les charges et l'impôt sur les sociétés.

Sachant cela, le schéma classique de prélèvements est le suivant : 
 * votre entreprise paye des charges et immobilisations qui seront déductibles du résultat imposable (impôt sur les sociétés) ; 
 * elle paye aussi votre rémunération quand vous le décidez ; 
 * à la fin de l'exercice, elle paye l'impôt sur les sociétés (IS) sur ce qui reste ; 
 * vous pouvez alors vous verser des dividendes.

Dans un premier temps, la rémunération et les dividendes sont asujettis aux cotisations sociales.
Ce qui reste est asujettis l'impôt sur le revenu (IR). 

Prenons un exemple simple : 
 * Mon entreprise a fait un chiffre d'affaire hors TVA de 100 000 €.
 * Elle a acheté du matériel, payé un comptable et d'autres services à hauteur de 10 000 €.
 * Je me suis versé durant l'exercice une rémunération de 50 000 € ; 
 * Sur ces 50 000 € une partie est destinée aux cotisations sociales. Imaginons 20 000 € ; 
 * Il reste donc une rémunération nette de 30 000 € ; 
 * Dans les caisses de l'entreprise il reste 100 000 - 10 000 - 50 000 = 40 000 €
 * A la fin de l'exercice l'IS est prélevé. Imaginons 10 000 €
 * Il reste donc 30 000 € distribuables en dividendes
 * Les cotisations sociales sont prélevées sur ces dividendes, disons à hauteur de 10 000 €
 * Les dividendes nets sont donc de 20 000 €
 * Le revenu total net est donc de 30 000 + 20 000 = 50 000 €
 * Enfin, on applique l'impôt sur le revenu sur ces 50 000 €, disons 15 000 €
 * Il me restera donc à titre personnel (super-net) 35 000 €`
    },
    revenu: {
        title: 'Revenu',
        content: `
Il s'agit de l'addition de la rémunération brute et des dividendes bruts.  
C'est donc le total de ce que votre entreprise vous verse.    
"Brut" signifie qu'aucun prélèvement - notamment les cotisations sociales - n'a été encore imputé.`
    },
    distribuable: {
        title: 'Dividendes distribuables',
        content: `
Une fois que toutes les "dépenses" ont été effectuées au sein de l'entreprise, il reste un bénéfice net.  
Les dépenses sont les charges, les rémunérations et l'impôt sur les sociétés.  
Le bénéfice net peut être intégralement ou partiellement redistribué sous forme de dividendes aux actionnaires.`
    },
    cotisationsRemu: {
        title: 'Cotisations sociales sur rémunération',
        content: `
Les cotisations sociales sur rémunération ne concernent pas votre entreprise mais vous-même en tant que gérant et personne physique.  
En principe, tout euro donné donne des droits. Ainsi, l'assurance maladie donne le droit à la sécurité sociale, de même pour la retraite, les allocations familiales, etc.  
Il y a deux exceptions, la CSG et la CRDS : ces deux taxes ne donnent aucun droit, et servent - entre autres - à "boucher" le trou de la sécu.  

Les montants et modalités sont différents selon que l'on soit SASU ou EURL : 
 * en EURL on est travailleur non-salarié (TNS). Si on est profession libérale on cotise à trois caisses : RSI pour la maladie, CIPAV pour la retraite, URSSAF pour le reste.
 * en SASU on est assimilé salarié et on paye nettement plus. `
    },
    assietteDividendesIR: {
        title: 'Assiette IR des dividendes',
        content:`
Un des gros avantages des dividendes est qu'ils sont taxés à l'IR sur 60% de leur valeur, et on peut aussi déduire la CSG de l'assiette (5,1%).  
Exemple donné par [www.service-public.fr](https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963) :  
*Par exemple, un actionnaire ou associé qui perçoit 1 000 € de dividendes doit acquitter 15,5 % de prélèvements sociaux, soit 155 €, déductibles à hauteur de 5,1 %, soit 51 €. Le montant imposable des revenus distribués, soumis au barème progressif de l'impôt sur le revenu, est égal à 600 € (1 000 - 1 000 x 40 %) - 51 € (CSG déductible) = 549 €.*  

Par ailleurs, au moment où les dividendes sont distribués, il y a un acompte de 21% qui est prélevé à la source. Il faudra donc l'indiquer sur sa feuille d'impôt pour qu'il soit déduit.`
    },
    impotSocietes: {
        title: 'Impôt sur les sociétés',
        content: `15% pour la partie en dessous de 38 120 €, et 33 % au-delà.
`
    }
}

