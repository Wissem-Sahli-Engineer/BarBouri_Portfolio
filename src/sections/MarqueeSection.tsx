import { useEffect, useRef, useState } from 'react';
import { workTilesRow1, workTilesRow2 } from '../components/WorkTiles';

type Tile = () => JSX.Element;

function Row({ tiles, transform }: { tiles: Tile[]; transform: string }) {
  const tripled = [...tiles, ...tiles, ...tiles];
  return (
    <div className="flex gap-3" style={{ transform, willChange: 'transform' }}>
      {tripled.map((TileVisual, i) => (
        <div key={i} className="h-[270px] w-[420px] flex-shrink-0 [&>div]:!rounded-2xl">
          <TileVisual />
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const sectionTop = ref.current.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <Row tiles={workTilesRow1} transform={`translateX(${offset - 200}px)`} />
        <Row tiles={workTilesRow2} transform={`translateX(${-(offset - 200)}px)`} />
      </div>
    </section>
  );
}
