import './AjouterCommentaire.scss';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Toaster from './Toaster';
import { useState } from 'react';
import { bd, collComs, collBandes } from '../code/init';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export default function AjouterCommentaire({ idBande, commentaires, setCommentaires }) {
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const auth = getAuth();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  async function ajouterComment(evt) {
    evt.preventDefault();
    setLoading(true);

    const texte = evt.target.texteCommentaire.value;
    const user = auth.currentUser;
      
    if (texte.trim() !== '' && user) {
      evt.target.reset();

      const newComment = {
        nomUtil: user.displayName,
        idUtil: user.uid,
        texte: texte,
        timestamp: Timestamp.now(),
        votes: {}, 
      };

      try {
        const docRef = await addDoc(collection(bd, collBandes, idBande, collComs), newComment);

        setCommentaires([{ ...newComment, id: docRef.id }, ...commentaires]);
      } catch (error) {
        console.error('Error adding document: ', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      if (!user) {
        setOpenToast(true);
      }
    }
  }

  return (
    <div className="AjouterCommentaire">
      <form onSubmit={ajouterComment}>
        <input
          type="text"
          placeholder="Ajoutez un commentaire ..."
          name="texteCommentaire"
          autoComplete="off"
          autoFocus={true}
        />
        <Button
          variant="contained"
          type="submit"
          className="btn-ajout-commentaire"
          size="small"
          disabled={loading}
        >
          <SendIcon />
        </Button>
      </form>
      <Toaster
        open={openToast}
        message="Connecte-toi pour ajouter un commentaire."
        onClose={handleClose}
      />
    </div>
  );
}
