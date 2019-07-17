import CotisationsSociales from "./cotisations-sociales";
import ImpotRevenu from "./impot-revenu";
import ImpotSociete from "./impot-societe";

export default class Exercice {
  capital: number;
  ca: number;
  charges: number;
  remuneration: number;
  dividendes: number;
  accre: boolean = false;
  autresRevenus: number = 0;
  bnc: number = 0;
  nbParts: number = 1;
  forme: string = "EURL";

  tauxAccreCsSalaire = 0.35;
  tauxCsSalaire = 0.8185;
  plafondAccre = 39228;
  plancherAccreLineaire = this.plafondAccre * 0.75;
  tauxCsgCrds = 0.172;
  tauxAbattementDividendes = 0.4;
  tauxCsgDeductible = 0.051;
  tauxAbattementBnc = 0.34;
  tauxAbattementFrais = 0.1;
  flatTax = false;
  tauxFlatTax = 0.3;

  ecoute;

  constructor(
    public impotSociete: ImpotSociete,
    public cotisations: CotisationsSociales,
    public impotRevenu: ImpotRevenu
  ) {}

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
    res.autresRevenus = this.autresRevenus;
    res.bnc = this.bnc;
    // Rémunération
    res.remuneration.net = this.remuneration;
    if (this.forme === "EURL") {
      this.cotisations.remuneration = res.remuneration.net;
      this.cotisations.accre = this.accre;
      res.remuneration.cs = this.cotisations;
      res.remuneration.cotisationsSociales = this.cotisations.getCotisations();
      res.remuneration.brut =
        res.remuneration.net + res.remuneration.cotisationsSociales;
      // https://www.urssaf.fr/portail/home/independant/mes-cotisations/quelles-cotisations/les-contributions-csg-crds/taux-de-la-csg-crds.html
      res.IR.assiette -= this.cotisations.getCsgCrds() * this.tauxCsgDeductible;
    }
    if (this.forme === "SASU") {
      res.remuneration.cs = undefined;
      // https://www.zefyr.net/blog/sasu-ou-eurl-comparaison-des-revenus-apres-charges-et-ir/
      // http://www.lecoindesentrepreneurs.fr/accre-president-de-sasu-ou-de-sas/
      // Calcul approximatif et pessimiste de cotisations en SASU
      let taux =
        this.accre && res.remuneration.net < this.plancherAccreLineaire
          ? this.tauxAccreCsSalaire
          : this.tauxCsSalaire;
      res.remuneration.cotisationsSociales = res.remuneration.net * taux;
      res.remuneration.brut =
        res.remuneration.net + res.remuneration.cotisationsSociales;

      // let n = res.remuneration.net;
      // // let cs =
      // //     n * 0.985 * 0.08 + // CSG/CRDS
      // //     n * 0.1359 + // Maladie
      // //     n * 0.1545 + // Retraite base
      // //     n * 0.0775 + // Retraite cadre
      // //     n * 0.0525 + // Allocs
      // //     n * 0.0055 + // Formation pro
      // //     n * 0.02 +  // AGFF
      // //     n * 0.015 + // Prévoyance
      // //     n * 0.001; // Logement
      // let pss = 39732;

      // // La règle : on prendle salaire brut salarial.
      // //

      // let cs =
      //     n * 0.13 + // Maladie
      //     n * 0.0230 + // Retraite déplafonnée
      //     (n < pss ? n * 0.1545 : pss * 0.1545) + // Retraite plafonnée
      //     n * (0.0525 + 0.0345) + // Allocs
      //     (n < pss ? n * 0.001 : pss * 0.001) +// Logement
      //     n * 0.003 + // solidarité autonomie
      //     n * 0.0016 + // syndicats
      //     n * 0.985 * 0.097 +// csg/crds à la louche
      //     (n < 4 * pss ? n * 0.0015 : pss * 4 * 0.0015) +// AGS
      //     (n < pss ? n * 0.0775 : pss * 0.0775) + // Retraite compl. cadre TA
      //     (n < pss ? n * 0.02 : pss * 0.02) + // AGFF cadre TA
      //     (n < pss * 8 ? n * 0.0035 : pss * 8 * 0.0035) + // CET
      //     (n < pss * 4 ? n * 0.006 : pss * 8 * 0.006) + // APEC
      //     (n < pss * 4 ? n * 0.015 : pss * 4 * 0.015) // APEC

      // console.log('net =', n, 'cs =', cs, 'brut =', n + cs, '% cs sur net =', cs / n * 100);
      // res.remuneration.brut = n + cs;
      // res.remuneration.cotisationsSociales = cs;
      // console.log(cs / n * 100, '%');
    }
    res.remuneration.assietteIR =
      res.remuneration.net * (1 - this.tauxAbattementFrais);
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
    res.societe.brut =
      res.societe.ca - res.societe.charges - res.remuneration.brut; // base IS
    res.IS.assiette = res.societe.brut;
    this.impotSociete.benefice = res.IS.assiette;
    res.IS.impot = this.impotSociete.getImpot();
    res.IS.tranches = this.impotSociete.getTranches();
    res.societe.reste = res.societe.brut - res.IS.impot - res.dividendes.brut;
    // Dividendes
    if (this.dividendes > 0) {
      if (this.forme === "SASU") {
        if (this.flatTax === false) {
          // Pour les dividendes en SA
          res.dividendes.cotisationsSociales =
            res.dividendes.brut * this.tauxCsgCrds;
          res.dividendes.net =
            res.dividendes.brut - res.dividendes.cotisationsSociales;
          // L'assiette de l'IR pour les dividendes : dividendes brut - 40% - csg (5,1%)
          // https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963
          res.dividendes.assietteIR =
            res.dividendes.brut * (1 - this.tauxAbattementDividendes) -
            res.dividendes.brut * this.tauxCsgDeductible;
        } else {
          res.dividendes.cotisationsSociales =
            res.dividendes.brut * this.tauxFlatTax;
          res.dividendes.net =
            res.dividendes.brut - res.dividendes.cotisationsSociales;
          res.dividendes.assietteIR = 0;
        }
      } else {
        // En SARL/EURL, on distingue la part < 10% du capital
        let dividendes10: any = {};
        dividendes10.brut = this.capital * 0.1;
        dividendes10.cotisationsSociales = dividendes10.brut * this.tauxCsgCrds;
        dividendes10.net = dividendes10.brut - dividendes10.cotisationsSociales;
        res.dividendes.dividendes10 = dividendes10;
        // Au dela ça douille
        let dividendes90: any = {};
        dividendes90.brut = res.dividendes.brut - dividendes10.brut;
        dividendes90.cotisationsSociales = dividendes90.brut * 0.45;
        dividendes90.net = dividendes90.brut - dividendes90.cotisationsSociales;
        res.dividendes.dividendes90 = dividendes90;

        res.dividendes.assietteIR =
          dividendes10.brut * (1 - this.tauxAbattementDividendes) -
          dividendes10.brut * this.tauxCsgDeductible +
          dividendes90.brut * (1 - this.tauxAbattementDividendes) -
          dividendes90.brut * this.tauxCsgDeductible;
        res.dividendes.cotisationsSociales =
          dividendes10.cotisationsSociales + dividendes90.cotisationsSociales;
        res.dividendes.net = dividendes10.net + dividendes90.net;
      }
      res.IR.assiette += res.dividendes.assietteIR;
    }
    // IR
    res.IR.assiette += this.autresRevenus * (1 - this.tauxAbattementFrais);
    res.IR.assiette += this.bnc * (1 - this.tauxAbattementBnc);
    this.impotRevenu.revenu = res.IR.assiette;
    this.impotRevenu.nbParts = this.nbParts;
    res.IR.impot = this.impotRevenu.getImpot();
    res.IR.tranches = this.impotRevenu.getTranches();

    // Brut perso
    res.brut =
      res.societe.ca -
      res.societe.charges -
      res.societe.reste +
      res.autresRevenus +
      res.bnc;
    // Net perso
    res.net =
      res.remuneration.net +
      res.dividendes.net +
      res.autresRevenus +
      res.bnc -
      res.IR.impot;
    return res;
  }
}
