import { StylingContainer } from '../../components';

export const NeedleDiv = StylingContainer({
  width: '13px',
  height: '200px',
  border: 'solid 1px black',
  borderTop: 'solid 10px red',
});

export const CenterDiv = StylingContainer({
  margin: '0 auto',
  width: 'max-content',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const BigDiv = StylingContainer({
  display: 'contents',
  fontSize: '4rem',
  margin: '64px',
});
