import Tranche from './tranche'

export default class ImpotRevenu {

    tranches: Tranche[];
    revenu: number;
    nbParts: number;

    //Source : https://www.impots.gouv.fr/portail/particulier/calcul-de-limpot-sur-le-revenu
    constructor() {
        this.tranches = [
            new Tranche(0, 9700, 0),
            new Tranche(9701, 26818, 0.14),
            new Tranche(26819, 71898, 0.3),
            new Tranche(71899, 152260, 0.41),
            new Tranche(152261, null, 0.45),
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
