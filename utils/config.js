import fetch from 'node-fetch';

export async function getConfig() {
  const [cashIn, cashOutNatural, cashOutJuridical] = await Promise.all([
    getCashInCommission(),
    getCashOutNaturalCommission(),
    getCashOutJuridicalCommission()
  ]);
  return {
    cash_in: {
      natural: cashIn,
      juridical: cashIn
    },
    cash_out: {
      natural: cashOutNatural,
      juridical: cashOutJuridical
    }
  };
}

async function getCashInCommission() {
  const res = await fetch(
    'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in'
  );
  const data = await res.json();
  return data;
}

async function getCashOutNaturalCommission() {
  const res = await fetch(
    'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural'
  );
  const data = await res.json();
  return data;
}

async function getCashOutJuridicalCommission() {
  const res = await fetch(
    'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical'
  );
  const data = await res.json();
  return data;
}
