import {
    Card,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from '@mui/material';
import { useEffect, useState } from "react";
import ProblemTableHead from './ProblemTableHead';
import ProblemTableRow from './ProblemTableRow';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const ProblemsList = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const getProblemsList = () => {
            const URL = "http://127.0.0.1:8000/problem/";

            fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    setProblems(data);
                })
        }
        getProblemsList();
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - problems.length) : 0;

    return <Container>
        <Card>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='medium'
                >
                    <ProblemTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {problems
                            .sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => {
                                return (
                                    <ProblemTableRow
                                        key={row.id}
                                        id={row.id}
                                        index={row.index}
                                        contest_id={row.contest_id}
                                        name={row.name}
                                        rating={row.rating}
                                        solve_count={row.solve_count}
                                        tags={row.tags}
                                    />
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={problems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    </Container>
};

export default ProblemsList;
