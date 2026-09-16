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
  estFavori: (code: string) => boolean;
  basculerFavori: (code: string) => void;
}

const FavorisContext = createContext<FavorisContextValue | null>(null);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favorisReducer, { codes: [] });

  const addFavori = (code: string) => dispatch({ type: "ADD", code });
  const removeFavori = (code: string) => dispatch({ type: "REMOVE", code });
  const estFavori = (code: string) => state.codes.includes(code);
  const basculerFavori = (code: string) => (estFavori(code) ? removeFavori(code) : addFavori(code));

  const value: FavorisContextValue = {
    state,
    addFavori,
    removeFavori,
    estFavori,
    basculerFavori,
  };

  return <FavorisContext.Provider value={value}>{children}</FavorisContext.Provider>;
}

export function useFavoris() {
  const context = useContext(FavorisContext);
  if (!context) throw new Error("useFavoris doit être utilisé dans un FavorisProvider");
  return context;
}
