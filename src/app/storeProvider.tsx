'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makePersistedStore, AppStore } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from '@/components/views/loadingScreen';
import { Persistor } from 'redux-persist';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<{ store: AppStore; persistor: Persistor }>();
  if (!storeRef.current) {
    storeRef.current = makePersistedStore();
  }
  // Handle user change between multiple taps
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.url.match(location.origin) && event.key === 'persist:user') {
        location.reload();
      }
    });
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate
        loading={<LoadingScreen />}
        persistor={storeRef.current.persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
