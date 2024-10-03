import './SeConnecter.scss';
import btnGoogle from '../images/btn-connexion-google.png';
import { useEffect, useState } from 'react';
import { connexion, deconnexion, observerEtatConnexion } from '../code/utilisateur-modele';

export default function SeConnecter() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    return observerEtatConnexion(setUtilisateur);
  }, []);

  return (
    <div className="SeConnecter">
      {utilisateur ? (
        <div className="btn-google" onClick={deconnexion}>
          <p className='btn-txt'>Déconnexion</p>
        </div>
      ) : (
        <div className="btn-google" onClick={connexion}>
          <img className='btn-img' src={btnGoogle} alt="" />
          <p className='btn-txt'>Connexion avec Google</p>
        </div>
      )}
    </div>
  );
}

