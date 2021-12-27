import React, { useState, useEffect } from 'react';
import {
  Button,
  FormGroup,
  Badge,
  Table,
  Label,
  FormText,
  Card, CardBody, CardHeader, Nav, Row, Col, Modal, Input, Form,
} from 'reactstrap';
import Jsona from 'jsona';
import ReactTable from '../../components/ReactTable/ReactTable';
import apiCall from '../../helpers/apiCall';
import BreadCrumbLayout from '../../components/BreadCrumbLayout/BreadCrumbLayout';
import NotifyUser from '../../components/Alert/NotifyUser';

export default function User(props) {
  const [users, setUsers] = useState([]);
  const [importUser, setImportUser] = useState(false);

  const isAdmin = () => props.globalState.userData.role === 'admin';
  useEffect(() => {
    apiCall.fetchEntities('/users.json')
      .then((res) => {
        const dataFormatter = new Jsona();
        const users = dataFormatter.deserialize(res.data);
        setUsers(users);
      });

    // check if error message is present
    const error_node = document.getElementById('error_data');
    const error_data = error_node && error_node.getAttribute('data') || {};

    // check if success message is present
    const success_node = document.getElementById('success_data');
    const success_data = success_node && success_node.getAttribute('data') || {};

    // don't notify if no message, when globalState is not set, when notification ref is not set
    if (Object.keys(error_data).length > 0 && typeof (props.globalState) !== 'undefined' && props.globalState.notificationRef != null) {
      NotifyUser(error_data, 'bc', 'danger', props.globalState.notificationRef);
    }

    if (Object.keys(success_data).length > 0 && typeof (props.globalState) !== 'undefined' && props.globalState.notificationRef != null) {
      NotifyUser(success_data, 'bc', 'success', props.globalState.notificationRef);
    }
  }, [props.globalState.notificationRef]); // trigger useEffect when props.globalState.notificationRef changes

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
          <Form
            id="user"
            action="/create_users"
            method="POST"
            encType="multipart/form-data"
          >
            <Input
              type="file"
              name="userFile"
              id="userFile"
              onChange={() => document.getElementById('user').submit()}
              style={{ display: 'none' }}
            />
          </Form>
          <Row className="flex-row-reverse mb-3">
            <Button
              className="btn btn-success float-end"
              size="sm"
              onClick={() => { document.getElementById('userFile').click(); }}
            >
              Import User
            </Button>
          </Row>
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
