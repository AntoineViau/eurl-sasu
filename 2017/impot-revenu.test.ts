import ImpotRevenu from "./impot-revenu";

describe('ImpotRevenu', () => {
  describe('getImpot', () => {
    it('should compute correctly', () => {
      const impotRevenu = new ImpotRevenu();
      impotRevenu.revenu = 75000;
      impotRevenu.nbParts = 2;
      expect(impotRevenu.getImpot()).toBeCloseTo(11085.64, 2);
    });
  });
});
