import responseCache from "../cache/responseCache.js";

const CACHE_TTL = {
  home: 10,
  matches: 10,
  commentary: 5,
  search: 30,
  pointsTable: 30,
  series: 60,
  teams: 60,
  players: 60,
};

export const createCacheMiddleware = (ttlKey) => {
  return (req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    const cacheKey = req.originalUrl;
    const cached = responseCache.get(cacheKey);

    if (cached) {
      return res.status(cached.status).json(cached.body);
    }

    const originalJson = res.json.bind(res);
    res.json = function (body) {
      const ttl = CACHE_TTL[ttlKey] || 60;
      responseCache.set(cacheKey, res.statusCode, body, ttl);
      return originalJson(body);
    };

    next();
  };
};
