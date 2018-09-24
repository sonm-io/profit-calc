import { createStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = createStyles({
  root: {
    background: '#6522ff',
    borderRadius: 'unset',
    boxShadow: 'none',
    fontWeight: 700,
    '&:hover': {
      background: '#d601f9',
    },
    '&:active': {
      boxShadow: 'none',
    }
  },
});

export default withStyles(styles)(Button);