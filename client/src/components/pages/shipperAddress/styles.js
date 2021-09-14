import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1),
        },
      },
      pageContent: {
          padding: theme.spacing(4),
          paddingLeft: theme.spacing(10),
      },
      margin: {
        margin: theme.spacing(1),
      },
      padding: {
        padding: theme.spacing(2)
      }
  }));