import ms from 'ms';
import url from 'url';
import cheerio from 'cheerio';
import nt from 'normalize-text';
import isEmpty from 'lodash.isempty';
import rp from 'promise-request-retry';

import { BASE_URL, SUCURSAL_ID } from '../constants';
import replaceWhitespace from '../helpers/replace-whitespace';

const checkStock = async ({ product, auth = {} }) => {
  try {
    const { productName } = product;

    const productNameFormatted = replaceWhitespace(productName);

    const $ = await rp({
      uri: BASE_URL,
      qs: {
        Ntt: productNameFormatted,
        sucursalId: SUCURSAL_ID,
      },
      ...(!isEmpty(auth) && {
        headers: {
          Cookie: `JSESSIONID=${auth.SESSION_COOKIE}`,
        },
      }),
      verbose_logging: false,
      transform: body => {
        return cheerio.load(body);
      },
      timeout: ms('120s'), // Due to high demand, the website is very slow. :/
      delay: ms('5s'),
      retry: 5,
    }).catch(() => {
      throw new Error('The website is down');
    });

    const isSessionExpired = $('a[title=Ingresar]').length > 0;

    if (isSessionExpired) {
      throw new Error('You session is expired');
    }

    const products = $('#products > li');

    return products
      .map((i, product) => {
        const title = $(product).find('.descrip_full').text();

        const isAvailable = $(product).find('.addToCart').length > 0;

        return {
          title: nt.normalizeText(title),
          isAvailable,
        };
      })
      .get();
  } catch (err) {
    throw err;
  }
};

export default checkStock;
