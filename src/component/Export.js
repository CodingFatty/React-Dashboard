import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import imageContext from '../context/image-context';
import {saveAs} from 'file-saver';
import ExcelJS from 'exceljs';

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
    const {state, dispatch} = useContext(imageContext);
    const [format, setFormat] = React.useState('pdf');

    const handleChange = (event) => {
        setFormat(event.target.value);
    };
    const handleDownload = () => {
        if (format === "pdf"){
            downloadPDF()
        } else {
            downloadExcel();
        }
    }
    const downloadPDF = () => {
        state.graph.save("graph.pdf");
    }
    const downloadExcel = async () => {
        let i = 1;
        const workbook = new ExcelJS.Workbook();
        for (let item of state.ExcelGraph){
            const worksheet = workbook.addWorksheet("Graph" + i++);
            const image = workbook.addImage({
                base64: item,
                extension: 'png',
            })
            worksheet.addImage(image, 'B2:Z50');
        }
        const buf = await workbook.xlsx.writeBuffer()
        saveAs(new Blob([buf]), 'graph.xlsx')
    }
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
                <Button onClick={handleDownload} variant="contained" color="primary" style = {{color: "white", background:"blue"}}>
                    EXPORT
                </Button>
            </FormControl>
        </div>
    )
}