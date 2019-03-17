export default class Tranche {
  constructor(private min: number, private max: number, private taux: number) {}

  getMin(): number {
    return this.min;
  }

  getMax(): number {
    return this.max;
  }

  getTaux(): number {
    return this.taux;
  }

  getImpot(revenu) {
    return this.compute(revenu);
  }

  compute(revenu) {
    if (revenu < this.min) {
      return 0;
    }
    if (null !== this.max && revenu > this.max) {
      let r = (this.max - this.min) * this.taux;
      return r;
    }
    let r = (revenu - this.min) * this.taux;
    return r;
  }
}
