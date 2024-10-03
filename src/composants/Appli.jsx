import './Appli.scss';
import SeConnecter from './SeConnecter';
import AfficherBande from './AfficherBande';

function Appli() {

  return (
    <div className="Appli">
      <SeConnecter></SeConnecter>
      <AfficherBande/>
    </div>
  )
}

export default Appli;