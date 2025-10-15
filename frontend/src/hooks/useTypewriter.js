import { useEffect, useState } from 'react';

/**
 * Animated typewriter effect for cycling through a list of words.
 * @param {string[]} words - Array of words to animate.
 * @param {number} typingSpeed - Milliseconds per character when typing.
 * @param {number} deletingSpeed - Milliseconds per character when deleting.
 * @param {number} pause - Milliseconds to pause after typing a word before deleting.
 * @returns {string} The current animated text.
 */
export function useTypewriter(words, typingSpeed = 90, deletingSpeed = 40, pause = 1200) {
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // which letter
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (!words.length) return;
    if (!deleting && subIndex === words[index].length) {
      // Pause before deleting
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (deleting && subIndex === 0) {
      // Move to next word
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, typingSpeed, deletingSpeed, pause]);

  useEffect(() => {
    setDisplay(words[index].substring(0, subIndex));
  }, [words, index, subIndex]);

  return display;
}
