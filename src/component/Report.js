import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { BarChart, Legend, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
    optionBar: {
        display: 'flex'
    },
    filterForm: {
        width: 300
    }
}));

const filterOptions = ['All', 'repo1', 'repo2']

const commitData = [
    { timestamp: 'Page A', commit: 9000 },
    { timestamp: 'Page B', commit: 7222 },
    { timestamp: 'Page C', commit: 6222 },
    { timestamp: 'Page D', commit: 5400 },
    { timestamp: 'Page E', commit: 3200 },
    { timestamp: 'Page F', commit: 2500 },
    { timestamp: 'Page G', commit: 1209 },
];

const pullData = [
    { timestamp: 'Page A', push: 2000, pull: 9000, star: 1000 },
    { timestamp: 'Page B', push: 2000, pull: 7222, star: 1000 },
    { timestamp: 'Page C', push: 2000, pull: 6222, star: 1000 },
    { timestamp: 'Page D', push: 2000, pull: 5400, star: 1000 },
    { timestamp: 'Page E', push: 2000, pull: 3200, star: 1000 },
    { timestamp: 'Page F', push: 2000, pull: 2500, star: 1000 },
    { timestamp: 'Page G', push: 2000, pull: 1209, star: 1000 },
];

export default function Report() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div>
            <div>
                <h2>Report Creator</h2>
            </div>
            <div className={classes.optionBar}>
                <Autocomplete
                    className={classes.filterForm}
                    multiple
                    id="tags-outlined"
                    options={filterOptions}
                    getOptionLabel={(option) => option}
                    defaultValue={[filterOptions[0]]}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Filter"
                            placeholder="Repository"
                        />
                    )}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Format</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>All Time</MenuItem>
                        <MenuItem value={20}>Last 7 Days</MenuItem>
                        <MenuItem value={30}>Last Month</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <div>
                    <h4>Commit Received Over Time</h4>
                    <AreaChart width={600} height={200} data={commitData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Area type='monotone' dataKey='commit' stroke='#82ca9d' fill='#82ca9d' />
                    </AreaChart>
                </div>
                <div>
                    <h4>Pull Request Activity By Type</h4>
                    <BarChart width={600} height={300} data={pullData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="push" stackId="a" fill="#8884d8" />
                        <Bar dataKey="pull" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="star" stackId="a" fill="#964B00" />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}