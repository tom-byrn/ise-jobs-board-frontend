"use client"
import React, { useState, useEffect } from 'react';

interface Props {
  text: string
}

function alternateSort(indices: number[]) {
  // Sort the array in ascending order
  indices.sort((a, b) => a - b);

  // Create a new array to store the alternated order
  const alternatedIndices = [];
  let start = 0;
  let end = indices.length - 1;

  // Alternately add the smallest and largest elements
  while (start <= end) {
    if (start === end) {
      alternatedIndices.push(indices[start]);
    } else {
      alternatedIndices.push(indices[start]);
      alternatedIndices.push(indices[end]);
    }
    start++;
    end--;
  }

  return alternatedIndices;
}

const AnimatedHeroText = (props: Props) => {
  const text = props.text
  const [visibleChars, setVisibleChars] = useState(new Set());
  const [animatingChars, setAnimatingChars] = useState(new Set());

  useEffect(() => {
    const indices = Array.from({ length: text.length }, (_, i) => i);
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    let shuffledIndices;
    const ran = Math.random()
    if (ran < 0.25) {
      shuffledIndices = indices.sort(() => Math.random() - 0.5);
    } else if (ran < 0.5) {
      shuffledIndices = indices.sort((a, b) => a - b);
    } else if (ran < 0.75) {
      shuffledIndices = indices.sort((a, b) => b - a);
    } else {
      shuffledIndices = alternateSort(indices)
    }

    shuffledIndices.forEach((index, i) => {
      const animationTimeout = setTimeout(() => {
        setAnimatingChars(prev => new Set([...prev, index]));
      }, i * 20);

      const charTimeout = setTimeout(() => {
        setVisibleChars(prev => new Set([...prev, index]));
        setTimeout(() => {
          setAnimatingChars(prev => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });
        }, 150);
      }, i * 20 + 30);

      timeouts.push(animationTimeout, charTimeout);
    });

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [text.length]);

  // Split text into words including their trailing spaces
  const words = text.match(/\S+\s*/g) || [];
  let currentIndex = 0;

  const emphasis = [4, 5, 6, 7, 8, 9]

  return (
    <h1 className="flex flex-wrap pt-10 font-mono text-5xl tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
      {words.map((word, wordIndex) => {
        const chars = word.split('').map((char, i) => {
          const absoluteIndex = currentIndex + i;
          return (
            <React.Fragment key={absoluteIndex}>
              {char === "C" ? <br /> : null}
              <span
                className={`${animatingChars.has(absoluteIndex)
                  ? 'bg-black dark:bg-white'
                  : 'bg-transparent'
                  } inline-block transition-all duration-300
                  `}
              >
                {visibleChars.has(absoluteIndex) ? (
                  <span className={`
                    ${animatingChars.has(absoluteIndex)
                      ? "text-white dark:text-black"
                      : "text-black dark:text-white"}
                    ${emphasis.indexOf(currentIndex) > -1 ? "font-bold" : "font-normal"}
                  `}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ) : (
                  <span className="opacity-0">{char === ' ' ? '\u00A0' : char}</span>
                )}
              </span>
            </React.Fragment>
          );
        });

        currentIndex += word.length;

        return (
          <span
            key={`word-${wordIndex}`}
            className="inline-flex"
          >
            {chars}
          </span>
        );
      })}
    </h1>
  );
};

export default AnimatedHeroText;
