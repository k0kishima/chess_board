// NOTE:
// storybook Failed to parse src "static... が発生してしまうため、その対症療法
// https://github.com/vercel/next.js/issues/18393#issuecomment-765426413
import * as nextImage from 'next/image';

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
