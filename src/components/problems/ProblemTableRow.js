import {
    Button,
    Chip,
    Collapse,
    Stack,
    TableCell,
    TableRow
} from '@mui/material';
import React, { useState } from 'react';

const ProblemTableRow = ({ id, contest_id, index, rating, solve_count, name, tags }) => {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow
                hover
                key={id}
            >
                <TableCell style={{ width: '7rem' }}>
                    {contest_id.toString() + index}
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    style={{ width: '20rem' }}
                >
                    <a href={`https://codeforces.com/contest/${contest_id}/problem/${index}`} target="_blank">{name}</a>
                </TableCell>
                <TableCell align="right">{rating}</TableCell>
                <TableCell align="right">{solve_count}</TableCell>
                <TableCell align="center">
                    <Button
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "HIDE" : "SHOW"}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto">
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            {tags.length > 0
                                ? tags.map(tag => <Chip key={tag.id} label={tag.name} />)
                                : <Chip label="No tags Available" />}
                        </Stack>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default ProblemTableRow;