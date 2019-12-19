const input = ({
  width: '15em',
  '&:hover fieldset': {
    borderColor: '#8da1ff !important',
  },
  '& label': {
    color: 'white'
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& input:valid + fieldset': {
    borderColor: 'white',
    borderWidth: 3,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 3,
  },
  '& input:valid:focus + fieldset': {
    borderWidth: 3,
    borderColor: '#8da1ff',
    paddingRight: '5px !important',
    paddingLeft: '8px !important',
  },
});

export default input;
