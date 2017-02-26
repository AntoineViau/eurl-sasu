export default class ImpotSociete {

    constructor(private benefice: number, private taux: number = 0.3333) {
    }

    getImpot() {
        return this.benefice > 38120 ? 38120 * 0.15 + (this.benefice - 38120) * this.taux : this.benefice * 0.15;
    }

    getTranches() {
        let tranches = [];
        tranches.push( this.benefice > 38120 ? 38120 * 0.15 : this.benefice * 0.15);
        tranches.push( this.benefice < 38120 ? 0 : (this.benefice - 38120) * this.taux);
        return tranches;
    }
}

