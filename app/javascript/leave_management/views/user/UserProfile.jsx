import {
  Card, CardHeader, CardBody, Row, Progress, ListGroup, ListGroupItem,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Jsona from 'jsona';
import avatar from 'argon-dashboard/assets/img/avatar';
import apiCall from '../../helpers/apiCall';
import BreadCrumbLayout from '../../components/BreadCrumbLayout/BreadCrumbLayout';

export default function User(props) {
  const isAdmin = () => props.globalState.userData.role === 'admin';
  const { id } = useParams();
  const [SICK_LEAVE, PAID_LEAVE, UNPAID_LEAVE] = [5, 18, 25];

  const [user, setUser] = useState({});

  useEffect(() => {
    apiCall.fetchEntities(`/users/${id}`)
      .then((res) => {
        const dataFormatter = new Jsona();
        setUser(dataFormatter.deserialize(res.data));
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
      <CardBody className="mx-auto card shadow" style={{width: '50%'}}>
        <div className="mx-auto">
          <span className="avatar avatar-lg rounded-circle">
            <img
                alt="..."
                src={avatar}
            />
          </span>
        </div>

        <div>
          <div style={{textAlign: 'center', fontWeight: 'bold'}}>
            {' '}
            {`${user.first_name}  ${user.last_name}`}
          </div>

          <br/>
          <br/>

          <ListGroup>
            <ListGroupItem> Email: {user.email}</ListGroupItem>
            <ListGroupItem>
              <div>
                Join Date: {user.start_date}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div>
                Sick Leave Balance: {user.sick_leave_balance}
              </div>
              <Progress value={(user.sick_leave_balance / SICK_LEAVE) * 100} />
            </ListGroupItem>
            <ListGroupItem>
              <div>
                Paid Leave Balance: {user.paid_leave_balance}
              </div>
              <Progress value={(user.paid_leave_balance / PAID_LEAVE) * 100} />
            </ListGroupItem>
            <ListGroupItem>
              <div>
                Unpaid Leave Balance: {user.unpaid_leave_balance}
              </div>
              <Progress value={(user.unpaid_leave_balance / UNPAID_LEAVE) * 100} />
            </ListGroupItem>
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
}
