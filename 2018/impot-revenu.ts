import Tranche from "./tranche";

export default class ImpotRevenu {
  tranches: Tranche[] = [];
  revenu: number;
  nbParts: number;

  //Source : https://www.impots.gouv.fr/portail/particulier/calcul-de-limpot-sur-le-revenu
  constructor() {
    this.tranches = [
        new Tranche(0, 9807, 0),
        new Tranche(9808, 27086, 0.14),
        new Tranche(27087, 72617, 0.3),
        new Tranche(72618, 153783, 0.41),
        new Tranche(153784, null, 0.45),
    ];
  }

  getImpot(): number {
    let total = 0;
    this.tranches.forEach(tranche => {
      total += tranche.getImpot(this.revenu / this.nbParts);
    });
    return total * this.nbParts;
  }

  getTranches() {
    let baseIR = this.revenu;
    let total = 0;
    let tranches = [];
    this.tranches.forEach(tranche => {
      tranches.push({
        value: tranche.getImpot(this.revenu / this.nbParts) * this.nbParts,
        min: tranche.getMin(),
        max: tranche.getMax(),
        taux: tranche.getTaux()
      });
    });
    return tranches;
  }
}
