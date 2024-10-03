import React, { useEffect, useState } from 'react';
import { deleteDoc, doc, onSnapshot, collection } from 'firebase/firestore';
import { bd, collBandes, collComs } from '../code/init';
import AjouterCommentaire from './AjouterCommentaire';
import AimerCommentaire from './AimerCommentaire';
import DeleteIcon from '@mui/icons-material/Delete';
import './AfficherCommentaires.scss';

export default function AfficherCommentaires({ idBande, utilisateur }) {
  const [commentaires, setCommentaires] = useState([]);

  useEffect(() => {
    if (idBande) {
      const unsubscribe = observer(idBande, setCommentaires);
      return () => unsubscribe();
    }
  }, [idBande]);

  const observer = (idBande, setCommentaires) => {
    const commentsRef = collection(bd, collBandes, idBande, collComs);
    return onSnapshot(commentsRef, snapshot => {
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCommentaires(comments);
    });
  };

  const sortedCommentaires = commentaires.sort((a, b) => {
    const netVotesA = Object.values(a.votes || {}).reduce((acc, vote) => acc + vote, 0);
    const netVotesB = Object.values(b.votes || {}).reduce((acc, vote) => acc + vote, 0);
    return netVotesB - netVotesA;
  });

  const handleDelete = async (commentId, commentOwnerId) => {
    if (utilisateur && utilisateur.uid === commentOwnerId) {
      try {
        await deleteDoc(doc(bd, collBandes, idBande, collComs, commentId));
        setCommentaires(commentaires.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error('Error deleting comment: ', error);
      }
    } else {
      console.error('Unauthorized deletion attempt');
    }
  };

  return (
    <div className="AfficherCommentaire">
      <h2>Commentaires</h2>
      <AjouterCommentaire idBande={idBande} commentaires={commentaires} setCommentaires={setCommentaires} utilisateur={utilisateur} />
      <ul>
        {sortedCommentaires.map(commentaire => (
          <li key={commentaire.id}>
            <p style={{ fontWeight: 'bold' }}>{commentaire.nomUtil}</p>
            <p>{commentaire.texte}</p>
            <div className="comment-actions">
              <AimerCommentaire idBande={idBande} commentaire={commentaire} utilisateur={utilisateur} />
              {utilisateur && commentaire.idUtil === utilisateur.uid && (
                <button className='Delete' onClick={() => handleDelete(commentaire.id, commentaire.idUtil)}>
                  <DeleteIcon />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
