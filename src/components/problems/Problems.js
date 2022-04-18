import { Grid, Typography } from "@mui/material";
import ProblemFilter from "./ProblemFilter";
import ProblemsList from "./ProblemsList";

const Problems = () => {
    return <>
        <Typography variant="h3" align="center" gutterBottom>
            Codeforces Problemset
        </Typography>
        <Grid container>
            <Grid item xs={9}>
                <ProblemsList />
            </Grid>
            <Grid item xs={3}>
                <ProblemFilter />
            </Grid>
        </Grid>
    </>
};

export default Problems;