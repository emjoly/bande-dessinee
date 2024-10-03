import React from 'react';
import AimerBande from './AimerBande';
import './AimerBandeConteneur.scss';

const AimerBandeConteneur = ({ idBande }) => {
  return (
    <div className="AimerBandeConteneur">
      <AimerBande idBande={idBande} />
    </div>
  );
};

export default AimerBandeConteneur;
