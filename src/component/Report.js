import React, {userState, useEffect} from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
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

const repoOptions = ['All', 'repo1', 'repo2']

const commitData = [
    { timestamp: 1590127790, commit: 9000 },
    { timestamp: 1590991790, commit: 7222 },
    { timestamp: 1591337390, commit: 6222 },
    { timestamp: 1591855790, commit: 5400 },
    { timestamp: 1592374190, commit: 3200 },
    { timestamp: 1592458945, commit: 2500 },
    { timestamp: 1592546990, commit: 1209 },
];

const pullData = [
    { timestamp: 1590127790, push: 2000, pull: 9000, star: 1000 },
    { timestamp: 1590991790, push: 2000, pull: 7222, star: 1000 },
    { timestamp: 1591337390, push: 2000, pull: 6222, star: 1000 },
    { timestamp: 1591855790, push: 2000, pull: 5400, star: 1000 },
    { timestamp: 1592374190, push: 2000, pull: 3200, star: 1000 },
    { timestamp: 1592458945, push: 2000, pull: 2500, star: 1000 },
    { timestamp: 1592546990, push: 2000, pull: 1209, star: 1000 },
];

const weekTimestamp = moment().subtract(7,'days').unix()
const monthTimestamp = moment().subtract(1,'months').unix()

const filterFunc = (filterData, time) => {
    return filterData.filter(data => {
        if (time === 0) return data.timestamp >= 0
        else if (time === 10) return data.timestamp >= weekTimestamp
        else return data.timestamp >= monthTimestamp
    })
}

export default function Report() {
    const classes = useStyles();
    const [date, setDate] = React.useState(0);
    const [repo, setRepo] = React.useState([repoOptions[0]]);
    const [filteredCommitData, setFilteredCommitData] = React.useState({
        name: "Commit Received Over Time",
        commitData
    });
    const [filteredPullData, setFilteredPullData] = React.useState({
        name: "Pull Request Activity By Type",
        pullData
    });

    const filterDate = (event) => {
        setDate(event.target.value);
        setFilteredCommitData({...filteredCommitData, commitData: filterFunc(commitData, event.target.value) })
        setFilteredPullData({...filteredPullData, pullData: filterFunc(pullData, event.target.value) })
    };

    const filterRepo = (event, value) => {
        if (value.length > 1 && value[0] === "All") {
            setRepo(value.filter(val => val !== "All"))
        } else if (value[value.length - 1]==="All") {
            setRepo(value.filter(val => val === "All"))
        } else {
            setRepo(value)    
        }
    };
    const renderToDate = (timestamp) => {
        return moment.unix(timestamp).format("MMMM Do")
    };

    const titleChange = (title, value) => {
        if (title === "commitData") {
            setFilteredCommitData({...filteredCommitData, name: value})
        } else {
            setFilteredPullData({...filteredPullData, name: value})
        }
    }

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
                    options={repoOptions}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    value={repo}
                    onChange={filterRepo}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Select Repo"
                            placeholder="Repository"
                        />
                    )}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select Time</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={date}
                        onChange={filterDate}
                    >
                        <MenuItem value={0}>All Time</MenuItem>
                        <MenuItem value={10}>Last 7 Days</MenuItem>
                        <MenuItem value={20}>Last Month</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
                {(repo.includes("repo1") || repo.includes("All")) && 
                    <div>
                        {/* <h4>Commit Received Over Time</h4> */}
                        <Input defaultValue={filteredCommitData.name} style = {{width: "50%"}} inputProps={{ 'aria-label': 'description' }} onChange={(event) => titleChange("commitData", event.target.value)}/>
                        <AreaChart width={800} height={200} data={filteredCommitData.commitData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" tickFormatter={renderToDate}/>
                            <YAxis />
                            <Tooltip labelFormatter={(value) => renderToDate(value)}/>
                            <Area type='monotone' dataKey='commit' stroke='#82ca9d' fill='#82ca9d' />
                        </AreaChart>
                    </div>
                }
                {(repo.includes("repo2") || repo.includes("All")) && 
                    <div>
                        {/* <h4>Pull Request Activity By Type</h4> */}
                        <Input defaultValue={filteredPullData.name} style = {{width: "50%"}} inputProps={{ 'aria-label': 'description' }} onChange={(event) => titleChange("pullData", event.target.value)}/>
                        <BarChart width={800} height={300} data={filteredPullData.pullData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" tickFormatter={renderToDate}/>
                            <YAxis />
                            <Tooltip labelFormatter={(value) => renderToDate(value)}/>
                            <Legend />
                            <Bar dataKey="push" stackId="a" fill="#8884d8" />
                            <Bar dataKey="pull" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="star" stackId="a" fill="#964B00" />
                        </BarChart>
                    </div>
                }
            </div>
        </div>
    )
}