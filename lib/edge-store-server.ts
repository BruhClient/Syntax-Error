
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStoreClient } from '@edgestore/server/core';
import { z } from 'zod';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.imageBucket().beforeDelete(({ }) => {
   
    return true; // allow delete
  }).input(z.object({
    type : z.enum(["issue","profile"])
  })).path(({input}) => [{type : input.type}]),
  
});
 

export const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
  });
  // ...
export const backendClient = initEdgeStoreClient({
    router: edgeStoreRouter,
  });


  export type EdgeStoreRouter = typeof edgeStoreRouter;