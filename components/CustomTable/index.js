import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const CustomTable = ({ data, headers }) => (
    <Paper className={classes.paper} elevation={3}>
        <Table className={classes.table} aria-label="a dense table" stickyHeader>
            <TableHead>
                <TableRow>
                    {headers.map((header, key) => (
                        <TableCell className={classes.tablecell} key={key}>
                            {header.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((oneRow, key) => (
                    <TableRow key={key}>
                        {headers.map((header, key) => (
                            <TableCell className={classes.tablecell} key={key}>
                                {oneRow[header.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {data.length > rowsPerPage && (
            <Paginator
                rowsPerPage={rowsPerPage}
                length={data.length}
                from={from}
                to={to}
                page={page}
                setPage={changePage}
            />
        )}
    </Paper>
);

export default CustomTable;
