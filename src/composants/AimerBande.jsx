import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { bd, collBandes } from '../code/init';
import { doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './AimerBande.scss';
 
export default function AimerBande({ idBande }) {
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
 
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);
 
  useEffect(() => {
    if (idBande) {
      const bandeRef = doc(bd, collBandes, idBande);
      const unsubscribe = onSnapshot(bandeRef, (doc) => {
        const data = doc.data();
        const aimeArray = data.aime || [];
        setLikesCount(aimeArray.length);
        if (userId) {
          setIsLiked(aimeArray.includes(userId));
        }
      });
      return unsubscribe;
    }
  }, [idBande, userId]);
 
  const handleClick = async () => {
    if (!userId) {
      setOpen(true);
      return;
    }
 
    const bandeRef = doc(bd, collBandes, idBande);
    const bandeDoc = await getDoc(bandeRef);
    if (bandeDoc.exists()) {
      const aimeArray = bandeDoc.data().aime || [];
      const newAimeArray = isLiked
        ? aimeArray.filter(id => id !== userId)
        : [...aimeArray, userId];
     
      await updateDoc(bandeRef, { aime: newAimeArray });
    }
  };
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
 
  return (
    <div className="AimerBande">
      <Fab aria-label="like" color={isLiked ? "secondary" : "default"} onClick={handleClick}>
        <FavoriteIcon />
      </Fab>
      {likesCount > 0 && <div className='likes'>{likesCount}</div>}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Connecte-toi pour aimer une bande."
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
 