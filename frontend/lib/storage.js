'use client';

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

const storage = typeof window !== 'undefined' ?
    require('redux-persist/lib/storage').default :
    createNoopStorage();

export default storage;