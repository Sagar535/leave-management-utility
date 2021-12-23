import React, { useState, useEffect } from 'react';
import {
  Button,
  Badge,
  Table,
  Card, CardBody, CardHeader, Nav, Row, Col, Modal, Input,
} from 'reactstrap';
import Jsona from 'jsona';
import ReactTable from '../../components/ReactTable/ReactTable';
import apiCall from '../../helpers/apiCall';
import BreadCrumbLayout from '../../components/BreadCrumbLayout/BreadCrumbLayout';

export default function User(props) {
  const [users, setUsers] = useState([]);

  const isAdmin = () => props.globalState.userData.role === 'admin';
  useEffect(() => {
    apiCall.fetchEntities('/users.json')
      .then((res) => {
        const dataFormatter = new Jsona();
        const users = dataFormatter.deserialize(res.data);
        setUsers(users);
      });
  }, []);

  return (
    <Card className="shadow mb-0">
      <CardHeader className="border-0 text-white bg-primary pb-6 px-5">
        <Row className="pt-4">
          <BreadCrumbLayout
            title="Users"
            isAdmin={isAdmin()}
          />
        </Row>
      </CardHeader>

      <CardBody className="mt--6">
        <div className="bg-white shadow-lg p-5 pb-7" style={{ borderRadius: 5 }}>
          <ReactTable
            resizable={false}
            data={users}
            loading={false}
            columns={[
              {
                Header: 'Username',
                id: 'username',
                Cell: (row) => {
                  const user = row.original;
                  return `${user.first_name} ${user.last_name}`;
                },
                style: { whiteSpace: 'unset' },
              },
              {
                Header: 'Email',
                accessor: 'email',
                style: { whiteSpace: 'unset' },
              },
              {
                Header: 'Leave Requests',
                accessor: 'leave_request_days_count',
                style: { whiteSpace: 'unset', textAlign: 'right' },
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom
            className="-striped -highlight text-capitalize"
          />
        </div>
      </CardBody>
    </Card>
  );
}
