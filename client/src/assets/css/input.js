const input = ({
  width: '15em',
  '&:hover fieldset': {
    borderColor: 'yellow !important',
  },
  '& label': {
    color: 'white'
  },
  '& label.Mui-focused': {
    borderColor: 'red ',
    color: 'yellow',
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
    borderColor: 'yellow',
    paddingRight: '5px !important',
    paddingLeft: '8px !important',
  },
});

export default input;
