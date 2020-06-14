import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default function Export() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div>
            <div>
                <h2>Export</h2>
            </div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Format</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={1}
                    onChange={handleChange}
                >
                    <MenuItem value={10}>PDF</MenuItem>
                    <MenuItem value={20}>CSV</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}