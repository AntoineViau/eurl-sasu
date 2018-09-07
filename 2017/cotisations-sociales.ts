export default class CotisationsSociales {

    remuneration: number = 0;
    accre: number = 0;
    accre2017: boolean;
    PASS: number = 39732

    _revenuPro() {
        return this.remuneration;
    }

    getMaladie(): number {
        if (this.accre2017 && this._revenuPro() < 0.75 * this.PASS) {
            return 0;
        }
        let assiette = this._revenuPro();
        return assiette * 0.065;
    }

    getAllocationsFamiliales() {
        if (this.accre2017 && this._revenuPro() < 0.75 * this.PASS) {
            return 0;
        }
        var assiette = this._revenuPro();
        var taux: number;
        if (assiette < this.PASS * 1.1) {
            taux = 0.0215;
        }
        if (assiette > this.PASS * 1.1 && assiette < this.PASS * 1.4) {
            let diffPASS = this.PASS * 1.4 - this.PASS * 1.1;
            let diffRp = assiette - this.PASS * 1.1;
            let pourcentage = diffRp / diffPASS;
            let diffPourcent = 0.0525 - 0.0215;
            taux = 0.0215 + diffPourcent * pourcentage;
        }
        if (assiette > this.PASS * 1.4) {
            taux = 0.0525;
        }
        return assiette * taux;
    }

    getFormationProfessionnelle(): number {
        return this.PASS * 0.0025;
    }

    getRetraiteBase(): number {
        if (this.accre2017 && this._revenuPro() < 0.75 * this.PASS) {
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
        if (this.accre2017 && this._revenuPro() < 0.75 * this.PASS) {
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
        if (this.accre2017 && this._revenuPro() < 0.75 * this.PASS) {
            return 0;
        }
        return 380;
    }

    getCsgCrds(): number {
        var assiette  = this._revenuPro() +
        this.getMaladie() + 
        this.getAllocationsFamiliales() + 
        this.getRetraiteBase();
        return assiette * 0.08;
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

