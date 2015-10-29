import { MockSuites } from './mock_suites';

export function main() {
  describe('MockSuites Service', () => {
    let suiteList;

    beforeEach(() => {
      suiteList = new MockSuites(10);
    });

    it('should return the list of suites', () => {
      let names = suiteList.getSuites();
      expect(names).toEqual(jasmine.any(Array));
    });
  });
}
