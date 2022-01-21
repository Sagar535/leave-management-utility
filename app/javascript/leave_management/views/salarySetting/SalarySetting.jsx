import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Nav,
    Row,
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
} from "reactstrap";
import {useParams} from "react-router-dom";
import apiCall from '../../helpers/apiCall';
import Jsona from "jsona";
import SalarySettingForm from "../../components/Forms/SalarySettingForm";

export default function SalarySetting(props) {
    const { id } = useParams()
    const [salarySetting, setSalarySetting] = useState({})
    const [updateSalarySetting, setUpdateSalarySetting] = useState(false)
    const [defaultTaxRules, setDefaultTaxRules] = useState([])
    const [userOptions, setUserOptions] = useState([])
    const [defaultUsers, setDefaultUsers] = useState([])

    useEffect(() => {
        const dataFormatter = new Jsona();

        apiCall.fetchEntities(`/salary_settings/${id}`)
            .then((res)=> {
                const salary_setting = dataFormatter.deserialize(res.data);
                setSalarySetting(salary_setting);

                setDefaultUsers(salary_setting.users.map((user) => {
                    return {label: `${user.first_name} ${user.last_name}`, value: user.id}
                }))

                setDefaultTaxRules(salary_setting.tax_rules.map((tax_rule) => (
                    {label: tax_rule.name, value: tax_rule.id}
                )))
            })

        apiCall.fetchEntities('/users.json')
            .then((res) => {
                const users = dataFormatter.deserialize(res.data)
                const user_options = users.map((user) => ({label: `${user.first_name} ${user.last_name}`, value: user.id}))
                setUserOptions(user_options)
            })
    }, [])

    useEffect(()=> {
        console.log(defaultTaxRules)
    }, [defaultTaxRules])

    const update = () => {
        apiCall.submitEntity({salary_setting: salarySetting}, `/salary_settings/${salarySetting.id}`, 'PUT')
            .then((res) => {
                const dataFormatter = new Jsona();
                const salarySetting = dataFormatter.deserialize(res.data);
                setSalarySetting(salarySetting);
            })
    }

    return (
        <>
            <Card className="shadow mb-0">
                <CardHeader className="border-0 text-white bg-primary pb-6 px-5">
                    <Row className="pt-4">
                        <Col lg="6">
                            <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
                                Salary Setting
                            </h6>
                            <Nav aria-label="breadcrumb" className="d-none d-inline-block ml-lg-4">
                                <ol className="breadcrumb breadcrumb-links breadcrumb-dark" style={{backgroundColor: 'inherit'}}>
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
                        <Button color='success' size='sm' className='mb-2' onClick={() => setUpdateSalarySetting(true)}>
                            Edit
                        </Button>
                        <Row>
                            <Col sm={12} md={6} lg={4}>
                                <h1>Salary setting</h1>
                                <ListGroup>
                                    {
                                        Object.keys(salarySetting).filter((key) => !['relationshipNames', 'type', 'id', 'users', 'tax_rules', 'user_ids'].includes(key))
                                            .map((salarySettingKey, index) => (
                                                <ListGroupItem key={index}>
                                                    {salarySettingKey} : {salarySetting[salarySettingKey]}
                                                </ListGroupItem>
                                            ))
                                    }
                                </ListGroup>
                            </Col>
                            <Col sm={12} md={6} lg={4}>
                                <h1>Users</h1>
                                <ListGroup>
                                    {
                                        defaultUsers.map((user, index) => (
                                            <ListGroupItem key={index}>
                                                {user.label}
                                            </ListGroupItem>
                                        ))
                                    }
                                </ListGroup>
                            </Col>

                            <Col sm={12} md={6} lg={4}>
                                <h1>Tax Rules</h1>
                                <ListGroup>
                                    {
                                        defaultTaxRules.map((tax_rule, index) => (
                                            <ListGroupItem key={index}>
                                                {tax_rule.label}
                                            </ListGroupItem>
                                        ))
                                    }
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>

            <Modal
                isOpen={updateSalarySetting}
                toggle={() => setUpdateSalarySetting(false)}
                className="modal-dialog-centered modal-secondary"
            >
                <div className="modal-header p-1">
                    <button
                        aria-hidden
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setUpdateSalarySetting(false)}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </button>
                </div>

                <div className="modal-body">
                    <SalarySettingForm
                        salarySetting={salarySetting}
                        setSalarySetting={setSalarySetting}
                        userOptions={userOptions}
                        defaultUsers={defaultUsers}
                        defaultTaxRules={defaultTaxRules}
                        handleSubmit={update}
                    />
                </div>
            </Modal>
        </>
    )
}
