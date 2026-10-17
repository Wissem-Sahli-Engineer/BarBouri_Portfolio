import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import type { CSSProperties } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const total = text.length;
  // Track each word's starting index in the full string so every char maps to its own scroll range.
  let cursor = 0;
  const words = text.split(' ').map((word) => {
    const start = cursor;
    cursor += word.length + 1;
    return { word, start };
  });

  return (
    <p ref={ref} className={className} style={style}>
      {words.map(({ word, start }, w) => (
        <span key={w}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((char, c) => {
              const i = start + c;
              return (
                <Char key={c} char={char} progress={scrollYProgress} range={[i / total, (i + 1) / total]} />
              );
            })}
          </span>
          {w < words.length - 1 && ' '}
        </span>
      ))}
    </p>
  );
}
