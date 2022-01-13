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
import {useHistory} from "react-router-dom";

export default function User(props) {
  const [users, setUsers] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [successData, setSuccessData] = useState({});

  const isAdmin = () => props.globalState.userData.role === 'admin';
  useEffect(() => {
    apiCall.fetchEntities('/users.json')
      .then((res) => {
        const dataFormatter = new Jsona();
        const users = dataFormatter.deserialize(res.data);
        setUsers(users);
      });

    // check if error message is present
    const errorNode = document.getElementById('error_data');
    setErrorData(errorNode && errorNode.getAttribute('data') || {});

    // check if success message is present
    const successNode = document.getElementById('success_data');
    setSuccessData(successNode && successNode.getAttribute('data') || {});

    // don't notify if no message, when globalState is not set, when notification ref is not set
    if (Object.keys(errorData).length > 0 && typeof (props.globalState) !== 'undefined' && props.globalState.notificationRef != null) {
      NotifyUser(errorData, 'bc', 'danger', props.globalState.notificationRef);
      setErrorData({});
    }

    if (Object.keys(successData).length > 0 && typeof (props.globalState) !== 'undefined' && props.globalState.notificationRef != null) {
      NotifyUser(successData, 'bc', 'success', props.globalState.notificationRef);
      setSuccessData({});
    }
  }, [props.globalState.notificationRef]); // trigger useEffect when props.globalState.notificationRef changes

  const history = useHistory();

  const onRowClick = (state, rowInfo) => isAdmin() && {
    onClick: (e) => {
      console.log(state)

      console.log(rowInfo)

      history.push(`/admin/user-profile/${rowInfo.original.id}`)
    },
  }

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
                Header: 'Join Date',
                accessor: 'join_date',
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
            getTrProps={onRowClick}
          />
        </div>
      </CardBody>
    </Card>
  );
}
