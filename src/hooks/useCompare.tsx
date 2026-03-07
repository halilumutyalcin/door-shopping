'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { Product } from '@/config/products.config';

interface CompareState {
  items: Product[];
}

type CompareAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: Product[] };

const MAX_COMPARE = 4;

function compareReducer(state: CompareState, action: CompareAction): CompareState {
  switch (action.type) {
    case 'ADD':
      if (state.items.length >= MAX_COMPARE) return state;
      if (state.items.some((p) => p.id === action.product.id)) return state;
      return { items: [...state.items, action.product] };
    case 'REMOVE':
      return { items: state.items.filter((p) => p.id !== action.productId) };
    case 'CLEAR':
      return { items: [] };
    case 'HYDRATE':
      return { items: action.items };
    default:
      return state;
  }
}

interface CompareContextValue {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(compareReducer, { items: [] });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kapi-compare');
      if (saved) {
        const items = JSON.parse(saved);
        if (Array.isArray(items)) {
          dispatch({ type: 'HYDRATE', items });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kapi-compare', JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const addToCompare = useCallback(
    (product: Product) => dispatch({ type: 'ADD', product }),
    []
  );

  const removeFromCompare = useCallback(
    (productId: string) => dispatch({ type: 'REMOVE', productId }),
    []
  );

  const clearCompare = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const isInCompare = useCallback(
    (productId: string) => state.items.some((p) => p.id === productId),
    [state.items]
  );

  return (
    <CompareContext.Provider
      value={{
        items: state.items,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isFull: state.items.length >= MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
