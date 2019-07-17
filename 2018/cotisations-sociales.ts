export default class CotisationsSociales {

    remuneration: number = 0;
    accre: boolean;
    PASS: number = 39228; // 2018 = 39732  

    _revenuPro() {
        return this.remuneration;
    }

    getMaladie(): number {
        if (this._revenuPro() < 43705) {
            let pc = this._revenuPro() / 43705;
            let taux = 1.5 + pc * (6.5 - 1.5);
            return this._revenuPro() * taux;
        }
        return this._revenuPro() * 0.065;
    }

    getAllocationsFamiliales() {
        if (this._revenuPro() < 43705) {
            return 0;
        }
        if (this._revenuPro() > 55625) {
            return this._revenuPro() * 0.0310;
        }
        let pc = (this._revenuPro() - 43705) / (55625 - 43705);
        let taux = pc * 3.1;
        return this._revenuPro() * taux;
    }

    getFormationProfessionnelle(): number {
        return 38616 * 0.0025;
    }

    getRetraiteBase(): number {
        if (this._revenuPro() < 28962) {
            return 0;
        }
        if (this._revenuPro() < 4441) {
            return 448;
        }
        let assiette = this._revenuPro();
        if (assiette < this.PASS) {
            return assiette * 0.0823 + assiette * 0.0187;
        }
        return this.PASS * 0.0823 + assiette * 0.0187;
    }

    getRetraiteComplementaire(): number {
        if (this.accre && this._revenuPro() < 28962) {
            return 0;
        }
        let assiette = this._revenuPro();
        let montant;
        if (assiette <= 26580) {
            montant = 1277;
        }
        if (assiette > 26580 && assiette <= 49280) {
            montant = 2553;
        }
        if (assiette > 49280 && assiette <= 57850) {
            montant = 3830;
        }
        if (assiette > 57850 && assiette <= 66400) {
            montant = 6384;
        }
        if (assiette > 66400 && assiette <= 83060) {
            montant = 8937;
        }
        if (assiette > 83060 && assiette <= 103180) {
            montant = 14044;
        }
        if (assiette > 103180 && assiette <= 123300) {
            montant = 15320;
        }
        if (assiette > 123300) {
            montant = 16597;
        }
        return montant;
    }

    getInvaliditeDeces(classe = 'C'): number {
        if (this.accre && this._revenuPro() < 28962) {
            return 0;
        }
        return 380;
    }

    getCsgCrds(): number {
        var assiette = this._revenuPro() +
            this.getMaladie() +
            this.getAllocationsFamiliales() +
            this.getRetraiteBase();
        return assiette * 0.097;
    }

    getCotisations(): number {
        var total = 0;
        total += this.getMaladie();
        total += this.getAllocationsFamiliales();
        total += this.getFormationProfessionnelle();
        total += this.getRetraiteBase();
        total += this.getRetraiteComplementaire();
        total += this.getInvaliditeDeces();
        total += this.getCsgCrds();
        return total;
    }
}

