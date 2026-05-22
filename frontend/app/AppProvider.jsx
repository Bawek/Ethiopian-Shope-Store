'use client';

import { makeStore } from '@/lib/store'
import { useRef, useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

export default function AppProvider({ children }) {
  const [isClient, setIsClient] = useState(false)
  const storeRef = useRef()
  const persistorRef = useRef()

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      storeRef.current = makeStore()
      persistorRef.current = persistStore(storeRef.current)
    }
  }, [])

  if (!isClient) return null

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  )
}