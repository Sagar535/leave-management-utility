import {Card, CardHeader, CardBody, Col, Nav, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import apiCall from "../../helpers/apiCall";
import Jsona from "jsona";
import ReactTable from '../../components/ReactTable/ReactTable';

export default function SalarySettingDashboard(props) {
    const [salarySettings, setSalarySettings] = useState([])

    useEffect(() => {
        apiCall.fetchEntities('/salary_settings.json')
            .then((res) => {
                const dataFormatter = new Jsona();
                setSalarySettings(dataFormatter.deserialize(res.data))
            });

        console.log(salarySettings)
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
                        <ReactTable
                            resizable={false}
                            data={salarySettings}
                            loading={false}
                            columns={[
                                {
                                    Header: 'SSF Office',
                                    accessor: 'ssf_office',
                                    style: { whiteSpace: 'unset' },
                                },
                                {
                                    Header: 'SSF Employee',
                                    accessor: 'ssf_employee',
                                    style: {whiteSpace: 'unset'}
                                },
                                {
                                    Header: 'Life Insurance Max',
                                    accessor: 'life_insurance_max',
                                    style: {whiteSpace: 'unset'}
                                },
                                {
                                    Header: 'SSF Tax Exemption Rate',
                                    accessor: 'ssf_tax_exemption_rate',
                                    style: {whiteSpace: 'unset'}
                                },
                                {
                                    Header: 'SSF Tax Exemption Max',
                                    accessor: 'ssf_tax_exemption_max',
                                    style: {whiteSpace: 'unset'}
                                }
                            ]}
                            defaultPageSize={5}
                            showPaginationBottom
                            className="-striped -highlight text-capitalize"
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    )
}
