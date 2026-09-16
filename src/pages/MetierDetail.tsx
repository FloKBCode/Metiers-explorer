import { useNavigate, useParams } from 'react-router-dom'

function MetierDetail() {
  // Récupère le paramètre dynamique de l'URL /metiers/:codeRome
  const { codeRome } = useParams<{ codeRome: string }>()
  const navigate = useNavigate()

  return (
    <section>
      <h1>Fiche métier : {codeRome}</h1>
      <p>(Page provisoire — le contenu réel de la fiche sera fait par Marly, branché sur l'API par Florence)</p>

      {/* Navigation programmée : retour à la page précédente */}
      <button type="button" onClick={() => navigate(-1)}>
        Retour
      </button>
    </section>
  )
}

export default MetierDetail