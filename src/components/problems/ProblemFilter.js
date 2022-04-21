import { Box, Button, ButtonGroup, Chip, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ProblemFilter = () => {
    const [data, setData] = useState({
        minRating: "",
        maxRating: "",
        minSolve: "",
        maxSolve: "",
        minContestId: "",
        maxContestId: "",
    });

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const getTagsList = () => {
            const URL = "http://127.0.0.1:8000/problem/tags/";

            fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    setTags(data);
                })
        }
        getTagsList();
    }, [])

    const selectTagChangeHandler = (event) => {
        setSelectedTags(
            typeof value === 'string' ? event.target.value.split(',') : event.target.value,
        );
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(data);
    };

    const resetHandler = (event) => {
        event.preventDefault();
        setData({
            minRating: "",
            maxRating: "",
            minSolve: "",
            maxSolve: "",
            minContestId: "",
            maxContestId: "",
        })
        setSelectedTags([]);
    };

    const handleChange = (event) => {
        const newData = { ...data };
        newData[event.target.name] = event.target.value;
        setData(newData);
    }


    return <Container>
        <Typography
            variant="h6"
            align="center"
            gutterBottom
        >
            Add Filters
        </Typography>
        <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
        >
            <TextField
                sx={{ m: 0.3, width: '15ch', paddingBottom: '10px' }}
                margin="normal"
                variant="outlined"
                id="minRating"
                label="Min Rating"
                name="minRating"
                type="number"
                value={data.minRating}
                onChange={handleChange}
            />
            <TextField
                sx={{ m: 0.3, width: '15ch', paddingBottom: '10px' }}
                margin="normal"
                variant="outlined"
                id="maxRating"
                label="Max Rating"
                name="maxRating"
                type="number"
                value={data.maxRating}
                onChange={handleChange}
            />
            <TextField
                sx={{ m: 0.3, width: '15ch', paddingBottom: '10px' }}
                margin="normal"
                variant="outlined"
                id="minSolve"
                label="Min Solve"
                name="minSolve"
                type="number"
                value={data.minSolve}
                onChange={handleChange}
            />
            <TextField
                sx={{ m: 0.3, width: '15ch', paddingBottom: '10px' }}
                margin="normal"
                variant="outlined"
                id="maxSolve"
                label="Max Solve"
                name="maxSolve"
                type="number"
                value={data.maxSolve}
                onChange={handleChange}
            />
            <TextField
                sx={{ m: 0.3, width: '15ch', paddingBottom: '10px' }}
                margin="normal"
                variant="outlined"
                id="minContestId"
                label="Min ContestID"
                name="minContestId"
                type="number"
                value={data.minContestId}
                onChange={handleChange}
            />
            <TextField
                sx={{ m: 0.3, width: '15ch', paddingBottom: '10px' }}
                margin="normal"
                variant="outlined"
                id="maxContestId"
                label="Max ContestID"
                name="maxContestId"
                type="number"
                value={data.maxContestId}
                onChange={handleChange}
            />
            <FormControl sx={{ m: 0.3, width: '30ch', paddingBottom: '10px' }}>
                <InputLabel id="multiple-tags-select-label">Select Tags</InputLabel>
                <Select
                    labelId="multiple-tags-select-label"
                    id="multiple-tags-select"
                    multiple
                    select
                    fullWidth
                    value={selectedTags}
                    onChange={selectTagChangeHandler}
                    input={<OutlinedInput id="select-multiple-chip" label="Select Tags" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {tags.map(tag => <MenuItem key={tag.id} value={tag.name}>{tag.name}</MenuItem>)}
                </Select>
            </FormControl>

            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit">Submit</Button>
                <Button color="error" onClick={resetHandler}>Reset</Button>
            </ButtonGroup>
        </Box>
    </Container >
};

export default ProblemFilter;