import { useEffect, useRef, useState } from 'react';
import CropSlot from '../crop-slot/CropSlot';
import './field.scss';

export default function Field() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!gridRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setContainerHeight(gridRef.current?.getBoundingClientRect().height ?? 0);
    });
    resizeObserver.observe(gridRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <div className="f-field">
      <div className="f-field-container" style={{ height: containerHeight }}>
        <div className="f-field-perspective">
          <div className="f-field-grid" ref={gridRef}>
            {[...Array(9)].map((_, i) => (
              <CropSlot key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
