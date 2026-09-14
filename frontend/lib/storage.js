'use client';

import storage from 'redux-persist/lib/storage';

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

const storageConfig = typeof window !== 'undefined' ?
    storage :
    createNoopStorage();

export default storageConfig;