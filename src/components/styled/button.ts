import { createStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = createStyles({
  root: {
    borderRadius: 'unset',
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none',
    }
  },
});

export default withStyles(styles)(Button);