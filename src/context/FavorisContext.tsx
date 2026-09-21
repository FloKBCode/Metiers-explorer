import { createContext, useContext, useReducer, type ReactNode } from "react";

interface FavorisState {
  codes: string[];
}

type FavorisAction = { type: "ADD"; code: string } | { type: "REMOVE"; code: string };

function favorisReducer(state: FavorisState, action: FavorisAction): FavorisState {
  switch (action.type) {
    case "ADD":
      if (state.codes.includes(action.code)) return state;
      return { codes: [...state.codes, action.code] };
    case "REMOVE":
      return { codes: state.codes.filter((c) => c !== action.code) };
    default:
      return state;
  }
}

interface FavorisContextValue {
  state: FavorisState;
  addFavori: (code: string) => void;
  removeFavori: (code: string) => void;
}

const FavorisContext = createContext<FavorisContextValue | null>(null);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favorisReducer, { codes: [] });

  const value: FavorisContextValue = {
    state,
    addFavori: (code) => dispatch({ type: "ADD", code }),
    removeFavori: (code) => dispatch({ type: "REMOVE", code }),
  };

  return <FavorisContext.Provider value={value}>{children}</FavorisContext.Provider>;
}

export function useFavoris() {
  const context = useContext(FavorisContext);
  if (!context) throw new Error("useFavoris doit être utilisé dans un FavorisProvider");
  return context;
}