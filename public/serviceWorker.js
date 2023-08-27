const QUERY_CACHE_KEY = "CACHE_GraphQL_v1";
const GRAPHQL_URL = "http://localhost/graphql";

const REQUEST_QUERY_RECIPES = "queryRecipes";

self.addEventListener("fetch", (e) => {
  if (isGraphql(e.request)) {
    handleGraphQL(e);
  }
});

function hash(x) {
  let h, i, l;
  for (h = 5381 | 0, i = 0, l = x.length | 0; i < l; i++) {
    h = (h << 5) + h + x.charCodeAt(i);
  }

  return h >>> 0;
}

const isGraphql = (request) => {
  return request.url.startsWith(GRAPHQL_URL);
};
const isMutation = (query) => {
  let regexMutation = /mutation/i;
  return regexMutation.test(query);
};

const isQueryRecipes = (query) => {
  let regexQueryRecipes = /recipes/;
  return regexQueryRecipes.test(query);
};
const isMutationCreateRecipe = (query) => {
  let regexQueryRecipes = /createRecipe/;
  return regexQueryRecipes.test(query);
};

function handleGraphQL(e) {
  const generateQueryId = e.request
    .clone()
    .json()
    .then(({ query, variables }) => {
      if (isMutation(query)) {
        console.log("pas de cache pour les mutations");
        if (isMutationCreateRecipe(query)) {
          removeFromCache(REQUEST_QUERY_RECIPES);
        }
        return null;
      } else if (isQueryRecipes(query)) {
        return REQUEST_QUERY_RECIPES;
      }

      return `http://query_${hash(JSON.stringify({ query, variables }))}`;
    });

  const networkResponse = fromNetwork(e.request);

  e.respondWith(
    (async () => {
      const queryId = await generateQueryId;
      const cachedResult = queryId && (await fromCache(queryId));
      if (cachedResult) {
        return cachedResult;
      }

      return networkResponse.then((res) => res.clone());
    })()
  );

  e.waitUntil(
    (async () => {
      try {
        const res = await networkResponse.then((res) => res.clone());
        const queryId = await generateQueryId;
        if (queryId) {
          await saveToCache(queryId, res);
        }
      } catch (err) {
        console.log(err);
      }
    })()
  );
}

async function fromCache(request) {
  const cache = await caches.open(QUERY_CACHE_KEY);
  const matching = await cache.match(request);

  return matching;
}

function fromNetwork(request) {
  return fetch(request);
}

async function saveToCache(request, response) {
  const cache = await caches.open(QUERY_CACHE_KEY);
  await cache.put(request, response);
}

async function removeFromCache(request) {
  const cache = await caches.open(QUERY_CACHE_KEY);
  await cache.delete(request);
}
