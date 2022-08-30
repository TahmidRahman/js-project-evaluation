import { isValidFileInput } from '../utils/file.js';
import { round, smallestCurrency } from '../utils/format.js';
import { getConfig } from '../utils/config.js';

describe('tests for utility functions', () => {
  describe('file tests', () => {
    describe('isValidFileInput tests', () => {
      it('throws error if no path given', () => {
        try {
          isValidFileInput();
        } catch (e) {
          expect(e.message).toBe('No input file has been provided');
        }
      });

      it('throws error if wrong extension', () => {
        try {
          isValidFileInput('sample.txt');
        } catch (e) {
          expect(e.message).toBe(
            'Only .json file is supported as an input, found .txt'
          );
        }
      });
    });
  });
  describe('format tests', () => {
    describe('round tests', () => {
      it('rounds any number with 2 decimal points', () => {
        expect(round(5)).toBe('5.00');
      });
    });

    describe('smallestCurrency tests', () => {
      it('calculates smallest currency', () => {
        expect(smallestCurrency(5)).toBe('0.05');
      });
    });
  });
  describe('config tests', () => {
    describe('getConfig tests', () => {
      it('returns config after api response', async () => {
        const response = await getConfig();
        expect(response).toEqual({
          cash_in: {
            natural: {
              percents: 0.03,
              max: {
                amount: 5,
                currency: 'EUR'
              }
            },
            juridical: {
              percents: 0.03,
              max: {
                amount: 5,
                currency: 'EUR'
              }
            }
          },
          cash_out: {
            natural: {
              percents: 0.3,
              week_limit: {
                amount: 1000,
                currency: 'EUR'
              }
            },
            juridical: {
              percents: 0.3,
              min: {
                amount: 0.5,
                currency: 'EUR'
              }
            }
          }
        });
      });
    });
  });
});
