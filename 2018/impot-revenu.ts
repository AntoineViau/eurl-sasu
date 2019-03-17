import Tranche from "./tranche";

export default class ImpotRevenu {
  tranches: Tranche[] = [];
  revenu: number;
  nbParts: number;
  constructor() {}

  getImpot(): number {
    let baseIR = this.revenu / this.nbParts;
    let total = 0;
    this.tranches.forEach(tranche => {
      total += tranche.getImpot(baseIR);
    });
    return total * this.nbParts;
  }

  getTranches() {
    let baseIR = this.revenu;
    let total = 0;
    let tranches = [];
    this.tranches.forEach(tranche => {
      tranches.push({
        value: tranche.getImpot(this.revenu),
        min: tranche.getMin(),
        max: tranche.getMax(),
        taux: tranche.getTaux()
      });
    });
    return tranches;
  }
}
