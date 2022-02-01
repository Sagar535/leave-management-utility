import React, { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardBody, CardText,
  Col, Row,
  Nav,
  Button,
} from 'reactstrap';

export default function Admin(props) {
  const [cards, setCards] = useState([
    {
      title: 'Salary',
      description: 'View and manage salaries.',
      url: '/admin/salary_settings',
    },
    {
      title: 'User',
      description: 'View and manage users.',
      url: '/admin/users',
    },
    {
      title: 'Tax Rule',
      description: 'View and manage Tax Rules.',
      url: '/admin/tax_rules',
    },
  ]);

  return (
    <Card className="shadow mb-0">
      <CardHeader className="border-0 text-white bg-primary pb-6 px-5">
        <Row className="pt-4">
          <Col lg="6">
            <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
              Admin
            </h6>
            <Nav aria-label="breadcrumb" className="d-none d-inline-block ml-lg-4">
              <ol className="breadcrumb breadcrumb-links breadcrumb-dark" style={{ backgroundColor: 'inherit' }}>
                <li className="breadcrumb-item"><i className="fas fa-home" /></li>
                <li className="breadcrumb-item" aria-current="page">Dashboard</li>
                <li className="breadcrumb-item" onClick={() => props.history.push('/admin/calendar')}>Calendar</li>
                <li className="breadcrumb-item active" onClick={() => props.history.push('/admin/admin')}>Admin</li>
              </ol>
            </Nav>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="mt--6">
        <div className="bg-white shadow-lg p-5 pb-7" style={{ borderRadius: 5 }}>
          <h1>SETTINGS</h1>

          <Row>
            {
                                cards.map((card, index) => (
                                  <Col md={4} sm={6} xs={12} key={index}>
                                    <Card>
                                      <CardBody>
                                        <CardTitle>{card.title}</CardTitle>
                                        <CardText>{card.description}</CardText>
                                        <Button color="secondary" onClick={() => props.history.push(card.url)}>GO</Button>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                ))
                            }
          </Row>
        </div>
      </CardBody>
    </Card>
  );
}
