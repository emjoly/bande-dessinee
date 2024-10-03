import { useEffect, useState } from 'react';
import { observerEtatConnexion } from "../code/utilisateur-modele";
import { bd, collBandes } from "../code/init";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import AfficherCommentaires from "./AfficherCommentaires";
import ChangerBande from "./ChangerBande";
import AimerBande from "./AimerBande";
import './AfficherBande.scss';

export default function AfficherBande() {
  const [bandes, setBandes] = useState([]);
  const [bandeActuelle, declarerBandeActuelle] = useState(null);
  const [page, setPage] = useState(1);
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const fetchBandes = async () => {
      const bandesQuery = query(collection(bd, collBandes), orderBy("dpub", "desc"));
      const querySnapshot = await getDocs(bandesQuery);
      const listeBandes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBandes(listeBandes);
      declarerBandeActuelle(listeBandes[0]);
    };

    fetchBandes();
  }, []);

  useEffect(() => {
    if (bandes.length > 0) {
      declarerBandeActuelle(bandes[page - 1]);
    }
  }, [page, bandes]);

  useEffect(() => {
    return observerEtatConnexion(setUtilisateur);
  }, []);

  return (
    <div className="AfficherBande">
      {bandeActuelle && (
        <>
  
          <div className="bd_container">
            <div className='fonctionne'> 
            <AimerBande idBande={bandeActuelle.id} />
              <div className="bd_box">
                <div className="bd_image">
                  <img src={bandeActuelle.url} alt="Comic" />
                </div>
              </div>
              <div className='fleche'><ChangerBande page={page} setPage={setPage} totalPages={bandes.length} /></div>
            </div>
            <div className='comm'>
              <AfficherCommentaires idBande={bandeActuelle.id} utilisateur={utilisateur} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
