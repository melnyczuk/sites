import { getStylingContainer } from '../../hof';

export const Paragraph = getStylingContainer({
  fontFamily: 'initial',
  fontSize: '18px',
  margin: '32px',
});

export const CenterDiv = getStylingContainer({
  margin: '0 auto',
  width: '67.5px',
});
