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

    //Source : https://www.impots.gouv.fr/portail/particulier/calcul-de-limpot-sur-le-revenu
    constructor() {
        this.tranches = [
            new Tranche(0, 9807, 0),
            new Tranche(9808, 27086, 0.14),
            new Tranche(27087, 72617, 0.3),
            new Tranche(72618, 153783, 0.41),
            new Tranche(153784, 99999999, 0.45),
        ];
    }

    getImpot(): number {
        let baseIR = this.revenu / this.nbParts;
        let total = 0;
        this.tranches.forEach((tranche) => {
            total += tranche.getImpot(baseIR);
        });
        return total * this.nbParts;
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
