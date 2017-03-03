import CotisationsSociales from './cotisations-sociales';
import ImpotRevenu from './impot-revenu';
import ImpotSociete from './impot-societe';

export default class Exercice {

    capital: number;
    ca: number;
    charges: number;
    remuneration: number;
    dividendes: number;
    accre2017: boolean = false;
    autresRevenus: number = 0;
    sa: boolean = false;

    constructor(
        private impotSociete: ImpotSociete,
        private cotisations: CotisationsSociales,
        private impotRevenu: ImpotRevenu) { }

    // constructor(
    //     private capital: number,
    //     private ca: number,
    //     private charges: number,
    //     private remuneration: number,
    //     private dividendes: number,
    //     private accre2017: boolean = false,
    //     private autresRevenus: number = 0,
    //     private sa: boolean = false) { }

    exercice() {
        let res: any = {
            remuneration: {
                cotisationsSociales: 0,
                brut: 0,
                net: 0,
                assietteIR: 0
            },
            dividendes: {
                cotisationsSociales: 0,
                brut: 0,
                assietteIR: 0,
                net: 0

            },
            societe: {
                ca: 0,
                charges: 0
            },
            IR: {},
            IS: {}
        };
        res.IR.assiette = 0;
        res.IS.assiette = 0;
        res.dividendes.brut = this.dividendes;
        // Rémunération
        res.remuneration.brut = this.remuneration;
        if (!this.sa) {
            //let cs = new CotisationsSociales(res.remuneration.brut, 0, this.accre2017);
            this.cotisations.remuneration = res.remuneration.brut;
            this.cotisations.accre2017 = this.accre2017;
            res.remuneration.cs = this.cotisations;
            res.remuneration.cotisationsSociales = this.cotisations.getCotisations();
            res.remuneration.net = res.remuneration.brut - res.remuneration.cotisationsSociales;
        } else {
            res.remuneration.cs = undefined;
            let taux = this.accre2017 && res.remuneration.brut < 39228 * 0.75 ? 1.35 : 1.8;
            // https://www.zefyr.net/blog/sasu-ou-eurl-comparaison-des-revenus-apres-charges-et-ir/
            // http://www.lecoindesentrepreneurs.fr/accre-president-de-sasu-ou-de-sas/
            res.remuneration.net = res.remuneration.brut / taux;
            res.remuneration.cotisationsSociales = res.remuneration.brut - res.remuneration.net;
        }
        res.remuneration.assietteIR = res.remuneration.net * 0.9;
        res.IR.assiette += res.remuneration.assietteIR; // https://captaincontrat.com/guide/regime-fiscal-dirigeant/
        // IS
        // A la fin de l'exercice, on commence par payer l'IS
        // Ce qui reste peut être mis en réserve ou distribué en dividendes
        // http://www.lecoindesentrepreneurs.fr/sarl-imposition-des-benefices/
        // Principe : un acompte de 21% d'IR. Il sera donc à déduire de l'IR.
        // http://www.leblogdudirigeant.com/dividendes-imposition-fiscalite/
        // https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963    
        res.societe.ca = this.ca;
        res.societe.charges = this.charges;
        res.societe.brut = res.societe.ca - res.societe.charges - this.remuneration; // base IS
        res.IS.assiette = res.societe.brut;
        //        let is = new ImpotSociete(res.IS.assiette);
        this.impotSociete.benefice = res.IS.assiette;
        res.IS.impot = this.impotSociete.getImpot();
        res.societe.reste = res.societe.brut - res.IS.impot - res.dividendes.brut;
        // Dividendes
        if (this.dividendes > 0) {
            if (this.sa) {
                // Pour les dividendes en SA
                res.dividendes.cotisationsSociales = res.dividendes.brut * 0.155;
                res.dividendes.net = res.dividendes.brut - res.dividendes.cotisationsSociales;
                // L'assiette de l'IR pour les dividendes : dividendes brut - 40% - csg (5,1%)
                // https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963
                res.dividendes.assietteIR = res.dividendes.brut * 0.6 - res.dividendes.brut * 0.051;
            } else {
                // En SARL/EURL, on distingue la part < 10% du capital 
                let dividendes10: any = {};
                dividendes10.brut = this.capital * 0.1;
                dividendes10.cotisationsSociales = dividendes10.brut * 0.155;
                dividendes10.net = dividendes10.brut - dividendes10.cotisationsSociales;
                res.dividendes.dividendes10 = dividendes10;
                // Au dela ça douille
                let dividendes90: any = {};
                dividendes90.brut = res.dividendes.brut - dividendes10.brut;
                dividendes90.cotisationsSociales = dividendes90.brut * 0.45;
                dividendes90.net = dividendes90.brut - dividendes90.cotisationsSociales;
                res.dividendes.dividendes90 = dividendes90;

                res.dividendes.assietteIR = dividendes10.brut * 0.6 - dividendes10.brut * 0.051 + dividendes90.brut * 0.6 - dividendes90.brut * 0.051;
                res.dividendes.cotisationsSociales = dividendes10.cotisationsSociales + dividendes90.cotisationsSociales;
                res.dividendes.net = dividendes10.net + dividendes90.net;
            }
            res.IR.assiette += res.dividendes.assietteIR;
        }
        // IR
        // let ir = new ImpotRevenu(res.IR.assiette);
        this.impotRevenu.revenu = res.IR.assiette;
        res.IR.impot = this.impotRevenu.getImpot();
        res.IR.tranches = this.impotRevenu.getTranches();

        // Brut, net
        res.brut = res.societe.ca - res.societe.charges - res.societe.reste;
        res.net = res.remuneration.net + res.dividendes.net - res.IR.impot;
        return res;
    }
}

