import parser from 'ua-parser-js';
import {
  LoginAttempt,
  Pagination,
  getLoginHistory,
} from '@/lib/services/auth.api';
import { useAppSelector } from '@/lib/store/hooks';
import { selectToken } from '@/lib/store/user/selectors';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

const LoginHistory = () => {
  const token = useAppSelector(selectToken);
  const [data, setData] = useState<LoginAttempt[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pageSize: 5,
  });

  const getDevice = (agent: string) => {
    const deviceData = parser(agent);
    if (!deviceData.os.name) return agent;
    return `${deviceData.browser.name ?? ''}/${deviceData.os.name ?? ''}`;
  };

  useEffect(() => {
    getLoginHistory(token ?? '', {
      page: pagination.page + 1,
      pageSize: pagination.pageSize,
    }).then(
      ({
        data: {
          data,
          meta: { pagination: paginationResult },
        },
      }) => {
        setData(data);
        setPagination({ ...paginationResult, page: paginationResult.page - 1 });
      },
    );
  }, [pagination.page, pagination.pageSize, token]);

  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 650,
        }}
        className="[&_td]:text-white [&_th]:text-white [&_th]:font-bold [&_th]:text-lg"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Login Type</TableCell>
            <TableCell align="right">IP address</TableCell>
            <TableCell align="right">Device</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((loginAttempt) => (
            <TableRow
              key={loginAttempt.time}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>{loginAttempt.type}</TableCell>
              <TableCell align="right">{loginAttempt.address}</TableCell>
              <TableCell align="right">
                {getDevice(loginAttempt.agent)}
              </TableCell>
              <TableCell align="right">
                {loginAttempt.success ? 'Success' : 'Failed'}
              </TableCell>
              <TableCell align="right">
                {new Date(loginAttempt.time).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              // colSpan={3}
              count={pagination.total ?? 0}
              rowsPerPage={pagination.pageSize}
              page={pagination.page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={(event, newPage) => {
                setPagination((oldPagination) => ({
                  ...oldPagination,
                  page: newPage,
                }));
              }}
              onRowsPerPageChange={(event) => {
                setPagination((oldPagination) => ({
                  ...oldPagination,
                  page: 0,
                  pageSize: +event.target.value,
                }));
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default LoginHistory;
