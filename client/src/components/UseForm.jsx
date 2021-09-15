import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

export function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        handleInputChange
    }
}

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        },
      },
      pageContent: {
          margin: theme.spacing(5),
          padding: theme.spacing(3),
      }
  }));

export function Form(props) {
    const classes = useStyles();
    return (
        <form className= {classes.root} onSubmit={handleSubmit}>
            {props.children}
        </form>
    )
}

