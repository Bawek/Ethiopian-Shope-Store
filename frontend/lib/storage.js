const createNoopStorage = () => ({
    getItem(_key) {
        return Promise.resolve(null);
    },
    setItem(_key, value) {
        return Promise.resolve(value);
    },
    removeItem(_key) {
        return Promise.resolve();
    },
});

const storageConfig = createNoopStorage();

export default storageConfig;