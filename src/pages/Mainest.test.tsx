import { render, screen } from '@testing-library/react';
import React from 'react';
import { PrepareCards } from './MainestPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
const ApiKey = '200750a91ad133284308acda4ca0a404';
const lineValue = 'cats';

const response = rest.get(
  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
    ApiKey +
    '&tags=' +
    lineValue +
    '&per_page=10&page=1&format=json&nojsoncallback=1',
  (req, res, ctx) => {
    return res(
      ctx.json({
        photos: {
          photo: [
            {
              farm: 66,
              id: '52442502957',
              isfamily: 0,
              isfriend: 0,
              ispublic: 1,
              owner: '187369351@N07',
              secret: '28ccac309f',
              server: '65535',
              title: 'Country of cats',
            },
          ],
        },
      })
    );
  }
);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const server = new setupServer(response);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('check text', async () => {
  render(<PrepareCards />);
  const linkElement = await screen.findByText(/Country of cats/i);
  expect(linkElement).toBeInTheDocument();
});
