import { connectStorageEmulator } from "firebase/storage";
import { bd, collBandes, collComs } from "./init";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";

/**
 * Obtenir les commentaires d'une bande quotidienne.
 * @param {string} idBande Chaîne indiquant l'identifiant de la bande quotidienne
 * @returns {Promise<Array>} Tableau contenant les commentaires (info complète)
 * de la bande requise.
 */
export async function obtenir(idBande) {
  // Pour chercher des documents dans Firestore getDocs.
  const lesComs = await getDocs(
    query(
      collection(bd, collBandes, idBande, collComs),
      orderBy("texte", "desc")
    )
  );
  // On les maps dans un objet pour ne pas utiliser la function de Firestore si jamais on change de base de donnée.
  // Pour chaque document on retourne un objet avec l'id et les données du document.
  return lesComs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export function observer(idBande, mutateur) {
  return onSnapshot(
    query(
      collection(bd, collBandes, idBande, collComs),
      orderBy("texte", "desc")
    ),
    resultat => {
      const commsFirestore = resultat.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      mutateur(commsFirestore);
    }
  );
}
