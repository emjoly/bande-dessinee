import { useState, useEffect } from 'react';
import { bd, collComs, collBandes } from '../code/init';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import Toaster from './Toaster';

export default function AimerCommentaires({ idBande, commentaire }) {
  const [votes, setVotes] = useState(commentaire.votes || {});
  const [userId, setUserId] = useState(null);
  const [showToast, setShowToast] = useState(false);

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
    const commentRef = doc(bd, collBandes, idBande, collComs, commentaire.id);
    const unsubscribe = onSnapshot(commentRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setVotes(docSnapshot.data().votes || {});
      }
    });

    return () => unsubscribe();
  }, [idBande, commentaire.id]);

  const handleVote = async (type) => {
    if (!userId) {
      setShowToast(true);
      return;
    }

    const currentVote = votes[userId];
    let newVotes;
    
    if (currentVote === type) {
      newVotes = { ...votes };
      delete newVotes[userId];
    } else {
      newVotes = { ...votes, [userId]: type };
    }

    setVotes(newVotes);

    const commentRef = doc(bd, collBandes, idBande, collComs, commentaire.id);
    await updateDoc(commentRef, { votes: newVotes });
  };

  const handleLike = () => handleVote(1);
  const handleDislike = () => handleVote(-1);

  const likeCount = Object.values(votes).filter(vote => vote === 1).length;
  const dislikeCount = Object.values(votes).filter(vote => vote === -1).length;

  return (
    <div className="AimerCommentaires">
      <div className="buttons">
        <button onClick={handleLike}>
          <FaThumbsUp /> Like ({likeCount})
        </button>
        <button onClick={handleDislike}>
          <FaThumbsDown /> Dislike ({dislikeCount})
        </button>
      </div>
      <Toaster
        open={showToast && !userId}
        message="Connectez-vous pour interagir avec les commentaires."
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
