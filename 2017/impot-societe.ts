export default class ImpotSociete {

    public benefice: number;
    public taux: number = 0.3333;

    getImpot(): number {
        if (this.benefice <= 38120) {
            return this.benefice * 0.15;
        }
        let is = 38120 * 0.15;
        if (this.benefice <= 75000) {
            is += (this.benefice - 38120) * 0.28;
            return is;
        }
        is += (75000 - 38120) * 0.28;
        is += (this.benefice - 75000) * 0.33;
        return is;
    }

    getTranches() {
        let tranches = [];
        tranches.push(this.benefice > 38120 ? 38120 * 0.15 : this.benefice * 0.15);
        tranches.push(this.benefice < 38120 ? 0 : (this.benefice - 38120) * this.taux);
        return tranches;
    }
}