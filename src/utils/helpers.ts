export const disablePageScrolling = (shouldDisable: boolean) => {
  document.body.style.setProperty('overflow', shouldDisable ? 'hidden' : '');
};

export const runWithViewTransition = (cb: () => void) => {
  if ('startViewTransition' in document) {
    document.startViewTransition(cb);
  } else {
    cb();
  }
};
