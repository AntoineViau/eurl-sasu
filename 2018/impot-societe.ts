import Tranche from "./tranche";

export default class ImpotSociete {
  public benefice: number;
  public prorata: number;
  revenu: number;

  constructor() {
    this.prorata = 1;
  }

  getBaseTranches() {
    return [
      new Tranche(0, 38120 * this.prorata, 0.15),
      new Tranche(38120 * this.prorata, 500000, 0.28),
      new Tranche(500000, null, 0.33)
    ];
  }

  getImpot(): number {
    let total = 0;
    this.getBaseTranches().forEach(tranche => {
      total += tranche.getImpot(this.benefice);
    });
    return total;
  }

  getTranches() {
    let baseIS = this.benefice;
    let tranches = [];

    this.getBaseTranches().forEach(tranche => {
      tranches.push({
        value: tranche.getImpot(this.benefice),
        min: tranche.getMin(),
        max: tranche.getMax(),
        taux: tranche.getTaux()
      });
    });

    return tranches;
  }
}
