import { NextFunction, Request, Response } from 'express';
import { join, map, pipe } from 'lodash/fp';
import { renderToNodeStream } from 'react-dom/server';

import { renderApp } from './renderer';

const stringify = (field: string, obj: object) =>
  `window.${field}=${JSON.stringify(obj).replace(/</g, '\\u003c')};`;

const getScriptsTags = pipe(
  map(
    file =>
      `<script defer type="application/javascript" src="${file}"></script>`
  ),
  join('')
);

export default async (req: Request, res: Response, next: NextFunction) => {
  const assets = [
    res.locals.assetPath('manifest.js'),
    res.locals.assetPath('vendor.js'),
    res.locals.assetPath('client.js'),
  ];

  const scripts = getScriptsTags(assets);

  const { app, css, status, stores, client } = await renderApp(req.url);

  res.status(status);

  res.contentType('text/html');
  res.write(`
    <html lang="en">
      <head>
        <base href="/" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        ${scripts}
      </head>
      <body>
        <div id="react-root">`);

  const stream = renderToNodeStream(app);

  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.end(`</div>
        <style id="jss-server-side">${css()}</style>
        <script>${stringify('__INITIAL_STATE__', stores.toObject())}</script>
        <script>${stringify('__APOLLO_STATE__', client.extract())}</script>
      </body>
    </html>
    `);
  });
};
