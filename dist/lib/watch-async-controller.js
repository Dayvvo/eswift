/*
  The purpose of this is to properly resolve async requests
  without the need for third party package.

  Essentially it is used for handling exceptions, before passing them to
  error handlers.

  Check the Inspection Router to see how it is used.
*/
export const WatchAsyncController = (fn) => (req, res, next) => Promise.resolve(fn(req, res).catch(next));
