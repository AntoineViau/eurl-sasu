class Tranche {

    constructor(private min: number, private max: number, private taux: number) { }

    getMin(): number { return this.min; };

    getMax(): number { return this.max; };

    getTaux(): number { return this.taux };

    getImpot(revenu) {
        return this.compute(revenu);
    }

    compute(revenu) {
        if (revenu < this.min) {
            return 0;
        }
        if (revenu > this.max) {
            let r = (this.max - this.min) * this.taux;
            return r;
        }
        let r = (revenu - this.min) * this.taux;
        return r;
    }

}

export default class ImpotRevenu {

    tranches: Tranche[];
    revenu: number;
    nbParts: number;

    constructor() {
        this.tranches = [
            new Tranche(0, 9700, 0),
            new Tranche(9701, 26818, 0.14),
            new Tranche(26819, 71898, 0.3),
            new Tranche(71899, 152260, 0.41),
            new Tranche(152261, 99999999, 0.45),
        ];
    }

    getImpot(): number {
        let baseIR = this.revenu / this.nbParts;
        let total = 0;
        this.tranches.forEach((tranche) => {
            total += tranche.getImpot(baseIR);
        });
        return total;
    }

    getTranches() {
        let baseIR = this.revenu;
        let total = 0;
        let tranches = [];
        this.tranches.forEach((tranche) => {
            tranches.push({ value: tranche.getImpot(this.revenu), min: tranche.getMin(), max: tranche.getMax(), taux: tranche.getTaux() });
        });
        return tranches;
    }
}
