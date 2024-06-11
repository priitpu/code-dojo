import { useContext } from 'react';
import { cropsList } from '../../constants/crop';
import MenuItem from '../menu-item/MenuItem';
import './menu.scss';
import { FarmContext } from '../../contexts/farm-context/FarmContext';



export default function Menu() {

  const { balance } = useContext(FarmContext);

  return (
    <div className="f-menu">
      <div className="f-menu-list">
        {cropsList.map((crop) => (
          <MenuItem key={crop} crop={crop} />
        ))}
      </div>

      <p className="f-menu-balance">
        Bank: {balance}€
      </p>
    </div>
  );
}
