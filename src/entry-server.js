import "isomorphic-fetch";
import { createApp } from "./main";

export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, router, apolloProvider } = await createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 404 });
      }

      Promise.all([
        // Apollo prefetch
        apolloProvider.prefetchAll(
          {
            route: router.currentRoute
          },
          matchedComponents
        )
      ]).then(() => {
        // Apollo
        context.apolloState = apolloProvider.getStates();
      });

      resolve(app);
    }, reject);
  });
};
