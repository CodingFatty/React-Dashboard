import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
    const [format, setFormat] = React.useState('pdf');

    const handleChange = (event) => {
        setFormat(event.target.value);
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
                    value={format}
                    onChange={handleChange}
                >
                    <MenuItem value={"pdf"}>PDF</MenuItem>
                    <MenuItem value={"csv"}>CSV</MenuItem>
                </Select>
                <Button variant="contained" color="primary" style = {{color: "white", background:"blue"}}>
                    EXPORT
                </Button>
            </FormControl>

        </div>
    )
}