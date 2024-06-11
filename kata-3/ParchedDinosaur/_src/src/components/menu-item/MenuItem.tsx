import { useContext } from 'react';
import { ECropType, cropCost, cropImg } from '../../constants/crop';
import './menu-item.scss';
import { FarmContext } from '../../contexts/farm-context/FarmContext';
import clsx from 'clsx';

interface IMenuItemProps {
  crop: ECropType;
}

export default function MenuItem({ crop }: IMenuItemProps) {
  const { selectItemItemToBuy, currentlyBuying, balance } =
    useContext(FarmContext);

  const onSelect = () => {
    if (currentlyBuying === crop) {
      selectItemItemToBuy(null);
      return;
    }
    selectItemItemToBuy(crop);
  };

  return (
    <div
      className={clsx('f-menu-item', {
        'f-menu-item--active': currentlyBuying === crop,
      })}
    >
      <button disabled={cropCost[crop] > balance} onClick={onSelect}>
        <img src={cropImg[crop]}></img>
      </button>

      <p>{cropCost[crop]}€</p>
    </div>
  );
}
