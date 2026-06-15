class ResponseCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, status, body, ttlSeconds) {
    this.cache.set(key, {
      status,
      body,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const cached = this.cache.get(key);
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return cached;
  }

  clear() {
    this.cache.clear();
  }

  delete(key) {
    this.cache.delete(key);
  }
}

export default new ResponseCache();
