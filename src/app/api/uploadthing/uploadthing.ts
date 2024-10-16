
import { createNextRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './core';

// Set up API handler using UploadThing's createNextApiHandler and your custom router
export const { GET, POST } = createNextRouteHandler({ router: ourFileRouter });