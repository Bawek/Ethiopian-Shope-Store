'use client';

import { createNoopStorage } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const storageConfig = typeof window !== 'undefined' ?
    storage :
    createNoopStorage();

export default storageConfig;