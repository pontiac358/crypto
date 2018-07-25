import React from 'react'
import ButtonMd from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const Button = props => {
    const { input, label, type, classes, disabled } = props;

    return (
        <ButtonMd disabled={ disabled } { ...input } type={type} variant="contained"  className={classes.button}>
            { label }
        </ButtonMd>
    )
}


export default withStyles(styles)(Button);
