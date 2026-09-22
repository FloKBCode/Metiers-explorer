// src/components/AsyncBoundary.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AsyncBoundary } from "./AsyncBoundary";

describe("AsyncBoundary", () => {
  it("n'affiche rien quand le state est 'idle'", () => {
    const { container } = render(
      <AsyncBoundary state={{ status: "idle" }}>
        {() => <div>Contenu</div>}
      </AsyncBoundary>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("affiche le Loader quand le state est 'loading'", () => {
    render(
      <AsyncBoundary state={{ status: "loading" }} loadingMessage="Chargement...">
        {() => <div>Contenu</div>}
      </AsyncBoundary>
    );
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("affiche le message d'erreur quand le state est 'error'", () => {
    render(
      <AsyncBoundary state={{ status: "error", error: "Une erreur est survenue" }}>
        {() => <div>Contenu</div>}
      </AsyncBoundary>
    );
    expect(screen.getByText(/Une erreur est survenue/)).toBeInTheDocument();
  });

  it("affiche les données quand le state est 'success' (comportement conditionnel)", () => {
    render(
      <AsyncBoundary state={{ status: "success", data: { nom: "Développeur" } }}>
        {(data) => <div>{data.nom}</div>}
      </AsyncBoundary>
    );
    expect(screen.getByText("Développeur")).toBeInTheDocument();
  });
});