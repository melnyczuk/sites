import { getStylingContainer } from '../../hof';

export const PageDiv = getStylingContainer({
  display: 'block',
  marginLeft: '25%',
  marginRight: '25%',
  justifyContent: 'center',
});

export const VideoDiv = getStylingContainer({
  marginTop: 50,
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const DescDiv = getStylingContainer({
  fontFamily: 'Sans-Serif',
  textAlign: 'left',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});
