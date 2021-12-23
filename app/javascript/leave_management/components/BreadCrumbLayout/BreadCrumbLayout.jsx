import {Col, Nav} from "reactstrap";
import React from "react";
import { useHistory } from "react-router-dom";

export default function BreadCrumbLayout(props) {
    const history = useHistory();

    const routeChange = (path) => history.push(path)

    return (
        <>
            <Col lg="6">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
                    {props.title}
                </h6>
                <Nav aria-label="breadcrumb" className="d-none d-inline-block ml-lg-4">
                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                        <li className="breadcrumb-item"><i className="fas fa-home" /></li>
                        <li
                            className={`breadcrumb-item ${ props.title === 'Dashboard' ? 'active' : '' }`}
                            aria-current="page"
                            onClick={() => routeChange('/admin/Dashboard')}
                        >
                            Dashboard
                        </li>
                        <li
                            className={`breadcrumb-item ${props.title === props.date  ? 'active' : ''}`}
                            onClick={() => routeChange('/admin/calendar')}
                        >
                            Calendar
                        </li>
                    </ol>
                </Nav>
            </Col>
        </>
    )
}
