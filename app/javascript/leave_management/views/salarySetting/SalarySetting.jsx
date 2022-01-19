import React, { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody, Col, Nav, Row, ListGroup, ListGroupItem} from "reactstrap";
import {useParams} from "react-router-dom";
import apiCall from '../../helpers/apiCall';
import Jsona from "jsona";

export default function SalarySetting(props) {
    const { id } = useParams()
    const [salarySetting, setSalarySetting] = useState({})

    useEffect(() => {
        apiCall.fetchEntities(`/salary_settings/${id}`)
            .then((res)=> {
                const dataFormatter = new Jsona();
                const salarySetting = dataFormatter.deserialize(res.data);
                setSalarySetting(salarySetting);
            })

    }, [])

    return (
        <>
            <Card className="shadow mb-0">
                <CardHeader className="border-0 text-white bg-primary pb-6 px-5">
                    <Row className="pt-4">
                        <Col lg="6">
                            <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
                                Leave Requests
                            </h6>
                            <Nav aria-label="breadcrumb" className="d-none d-inline-block ml-lg-4">
                                <ol className="breadcrumb breadcrumb-links breadcrumb-dark" style={{backgroundColor: 'inherit'}}>
                                    <li className="breadcrumb-item"><i className="fas fa-home" /></li>
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    <li className="breadcrumb-item" onClick={() => props.history.push('/admin/calendar')}>Calendar</li>
                                    <li className="breadcrumb-item" onClick={() => props.history.push('/admin/admin')}>Admin</li>
                                </ol>
                            </Nav>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="mt--6">
                    <div className="bg-white shadow-lg p-5 pb-7" style={{ borderRadius: 5 }}>
                        <h1>Salary setting</h1>
                        <ListGroup>
                            {
                                Object.keys(salarySetting).filter((key) => key != 'type' && key != 'id')
                                    .map((salarySettingKey, index) => (
                                        <ListGroupItem key={index}>
                                            {salarySettingKey} : {salarySetting[salarySettingKey]}
                                        </ListGroupItem>
                                    ))
                            }
                        </ListGroup>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}
