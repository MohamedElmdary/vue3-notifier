/**
 * This file includes all animations that applied to notifications list
 */

import gsap from 'gsap';

export function leave(toLeft = false) {
  return (el: Element, done: () => void) => {
    gsap
      .to(el, {
        opacity: 0,
        translateX: toLeft ? '-100%' : '100%',
        duration: 0.5,
      })
      .then(() =>
        gsap.to(el, {
          height: 0,
          margin: 0,
          duration: 0.5,
        }),
      )
      .then(done);
  };
}
