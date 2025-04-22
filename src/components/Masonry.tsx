import { useLayoutEffect } from 'preact/hooks';
import MagicGrid from 'magic-grid';

export const Masonry = ({ selectors }: { selectors: string[] }) => {
  useLayoutEffect(() => {
    selectors.forEach(selector => {
      const grid = new MagicGrid({
        static: true,
        gutter: 20,
        container: selector,
      });

      grid.listen();
    });
  }, []);

  return null;
};
