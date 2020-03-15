import gradient from '../img/california-inverse.jpg'

const modal = ({
  background: `url("${gradient}")`,
  backgroundSize: '100% 75%',
  backgroundPosition: '75% 0%',
  backgroundRepeat: 'round',
  width: '45rem',
  paddingTop: '1rem',
  paddingBottom: '2rem',
  paddingRight: '2rem',
  paddingLeft: '2rem',
  backgroundFilter: 'FlipV',
  color: 'white',
  '&::before': {
    content: '',
    margin: 0,
    transform: 'scaleY(-1)',
    display: 'inline-block'
  },
});

export default modal;
