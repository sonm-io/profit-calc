export default {
  
  control: (base: React.CSSProperties, state: any) => {
    console.log(base, state);
    return {
      ...base,
      borderRadius: 'unset',
      boxShadow: 'none',
      borderColor: state.isFocused ? '#6522ff' : 'hsl(0, 0%, 80%)',
      '&:focus': {
        borderColor: state.isFocused ? '#6522ff' : 'hsl(0, 0%, 80%)'
      },
      '&:hover': {
        borderColor: state.isFocused ? '#6522ff' : 'hsl(0, 0%, 80%)'
      },
    }
  },
  menu: (base: React.CSSProperties) => ({
    ...base,
    borderRadius: 'unset',
  })
}
