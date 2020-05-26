import gradient from '../img/california-inverse.jpg'

const alt = ({
  background: `url("${gradient}")`,
  borderWidth: 2.5,
  color: 'white',
  fontSize: '.5em',
  padding: '.2em .75em',
  marginBottom: '1em',
  float: 'left',
  '&:hover': {
    background: '#2de28e',
    borderColor: 'white'
  }
});

export default alt;
