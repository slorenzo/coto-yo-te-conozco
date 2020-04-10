import cron from 'node-cron';

import './helpers/verify-env-vars';
import checkStock from './lib/check-stock';
import basicProducs from './data/basic-products.json';
import { SESSION_COOKIE } from './constants';
import buildTable from './helpers/build-table';

const init = async () => {
  const results = basicProducs.products.reduce(async (acc, product) => {
    const resultLogged = await checkStock({
      product,
      auth: { SESSION_COOKIE },
    });

    const resultNotlogged = await checkStock({
      product,
    });

    const finalResult = resultNotlogged.map(product => {
      const { title, isAvailable } = product;

      if (!isAvailable) return product;

      return {
        title,
        isAvailable: resultLogged.some(product => product.title === title),
      };
    });

    return [...(await acc), ...finalResult];
  }, Promise.resolve([]));

  return results;
};

cron.schedule('*/10 * * * *', () => {
  init()
    .then(products => {
      const out = buildTable(products).render();
      console.log(out);
      process.exit(0);
    })
    .catch(err => {
      console.error('An unexpected error occurred:', err.message);
      process.exit(1);
    });
});


