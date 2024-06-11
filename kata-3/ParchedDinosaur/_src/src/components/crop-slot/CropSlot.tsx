import { useContext, useEffect, useState } from 'react';
import { FarmContext } from '../../contexts/farm-context/FarmContext';
import './crop-slot.scss';
import { ECropType, cropImg } from '../../constants/crop';
import clsx from 'clsx';

export default function CropSlot() {
  const { currentlyBuying, plantItem, sellItem } = useContext(FarmContext);

  const [plantedCrop, setPlantedCrop] = useState<ECropType | null>(null);
  const [cropReady, setCropReady] = useState(false);

  const canHarvest = plantedCrop && cropReady;

  useEffect(() => {
    if (plantedCrop) {
      setTimeout(() => {
        setCropReady(true);
      }, 10000);
    }
  }, [plantedCrop]);

  const plantCrop = () => {
    if (currentlyBuying) {
      setPlantedCrop(currentlyBuying);
      plantItem(currentlyBuying);
    }
  };

  const harvestCrop = () => {
    if (plantedCrop) {
      sellItem(plantedCrop);
      setPlantedCrop(null);
      setCropReady(false);
    }
  };

  const onClick = () => {
    if (plantedCrop) {
      harvestCrop();
    } else {
      plantCrop();
    }
  };

  return (
    <button
      className={clsx('f-crop-slot', { 'f-crop-slot--filled': plantedCrop })}
      disabled={!currentlyBuying && !canHarvest}
      onClick={onClick}
    >
      <div className="left" />
      <div className="right" />
      <div className="front" />
      <div className="top" />
      {plantedCrop && <img className='f-crop-img' src={cropImg[plantedCrop]}/>}
    </button>
  );
}
