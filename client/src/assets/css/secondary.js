const trigger = _color => ({
  background: _color,
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

export default trigger;
