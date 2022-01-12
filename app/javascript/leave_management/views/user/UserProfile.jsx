import {
  Card, CardHeader, CardBody, Row, Progress,
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
      <CardBody className="mx-auto">
        <span className="avatar avatar-sm rounded-circle">
          <img
            alt="..."
            src={avatar}
          />
        </span>
        <div>
          <div>
            {' '}
            Name:
            {`${user.first_name}  ${user.last_name}`}
          </div>
          <div>
            {' '}
            Email:
            {user.email}
          </div>

          <div>
            {' '}
            Join Date:
            {user.join_date}
          </div>
          <div>
            {' '}
            Sick Leave Balance:
            {user.sick_leave_balance}
          </div>
          <Progress value={(user.sick_leave_balance / SICK_LEAVE) * 100} />
          <div>
            {' '}
            Paid Leave Balance:
            {user.paid_leave_balance}
          </div>
          <Progress value={(user.paid_leave_balance / PAID_LEAVE) * 100} />
          <div>
            {' '}
            Unpaid Leave Balance:
            {user.unpaid_leave_balance}
          </div>
          <Progress value={(user.unpaid_leave_balance / UNPAID_LEAVE) * 100} />
        </div>
      </CardBody>
    </Card>
  );
}
