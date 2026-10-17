import { useEffect, useRef, useState } from 'react';
import { marqueeImages } from '../data';

const row1 = marqueeImages.slice(0, 11);
const row2 = marqueeImages.slice(11);

function Row({ images, transform }: { images: string[]; transform: string }) {
  const tripled = [...images, ...images, ...images];
  return (
    <div className="flex gap-3" style={{ transform, willChange: 'transform' }}>
      {tripled.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="h-[270px] w-[420px] flex-shrink-0 rounded-2xl object-cover"
        />
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
        <Row images={row1} transform={`translateX(${offset - 200}px)`} />
        <Row images={row2} transform={`translateX(${-(offset - 200)}px)`} />
      </div>
    </section>
  );
}
