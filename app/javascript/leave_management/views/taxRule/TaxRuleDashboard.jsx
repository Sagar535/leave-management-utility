import {
    Button,
    Card, CardHeader, CardBody,
    Col, Nav, Row, Modal
} from "reactstrap";
import React, {useEffect, useState} from "react";
import ReactTable from "../../components/ReactTable/ReactTable";
import apiCall from "../../helpers/apiCall";
import Jsona from "jsona";
import TaxRuleForm from "../../components/Forms/TaxRuleForm";

export default function TaxRuleDashboard(props) {
    const [createTaxRule, setCreateTaxRule] = useState(false)
    const [updateTaxRule, setUpdateTaxRule] = useState(false)
    const [taxRule, setTaxRule] = useState({})
    const [taxRules, setTaxRules] = useState([])
    const [taxRuleId, setTaxRuleId] = useState()

    useEffect(() => {
        apiCall.fetchEntities('/tax_rules.json')
            .then((res) => {
                const dataFormatter = new Jsona();
                setTaxRules(dataFormatter.deserialize(res.data))
            })
    }, [])

    const onRowClick = (state, rowInfo) => ({
        onClick: (e) => {
            setUpdateTaxRule(true)
            console.log(rowInfo.original)
            setTaxRuleId(rowInfo.original.id)
        }
    })

    const create = () => {
        apiCall.submitEntity({tax_rule: taxRule}, `/tax_rules.json`)
            .then((res) => {
                const dataFormatter = new Jsona()
                const taxRule = dataFormatter.deserialize(res.data)
                setTaxRules([...taxRules, taxRule])
            })
    }

    const update = () => {
        apiCall.submitEntity({tax_rule: taxRule}, `/tax_rules/${taxRuleId}`)
            .then((res) => {
                cons
            })
    }

    return (
        <>
            <Card className="shadow mb-0">
                <CardHeader className="border-0 text-white bg-primary pb-6 px-5">
                    <Row className="pt-4">
                        <Col lg="6">
                            <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
                                Tax Rule Dashboard
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
                        <Button color='success' size='sm' className='mb-2' onClick={() => setCreateTaxRule(true)}>
                            New Tax Rule
                        </Button>
                        <ReactTable
                            resizable={false}
                            data={taxRules}
                            loading={false}
                            columns={[
                                {
                                    Header: 'Name',
                                    accessor: 'name',
                                    style: { whiteSpace: 'unset' },
                                },
                                {
                                    Header: 'From Date',
                                    accessor: 'from_date',
                                    style: {whiteSpace: 'unset'}
                                },
                                {
                                    Header: 'To Date',
                                    accessor: 'to_date',
                                    style: {whiteSpace: 'unset'}
                                },
                            ]}
                            defaultPageSize={5}
                            showPaginationBottom
                            className="-striped -highlight text-capitalize"
                            getTrProps={onRowClick}
                        />
                    </div>
                </CardBody>
            </Card>

            <Modal
                isOpen={createTaxRule}
                toggle={() => setCreateTaxRule(false)}
                className="modal-dialog-centered modal-secondary"
            >
                <div className="modal-header p-1">
                    <button
                        aria-hidden
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setCreateTaxRule(false)}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </button>
                </div>

                <div className="modal-body">
                    <TaxRuleForm
                        taxRule={taxRule}
                        setTaxRule={setTaxRule}
                        handleSubmit={create}
                    />
                </div>
            </Modal>

            <Modal
                isOpen={updateTaxRule}
                toggle={() => setUpdateTaxRule(false)}
                className="modal-dialog-centered modal-secondary"
            >
                <div className="modal-header p-1">
                    <button
                        aria-hidden
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setUpdateTaxRule(false)}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </button>
                </div>

                <div className="modal-body">
                    <TaxRuleForm
                        taxRule={taxRule}
                        setTaxRule={setTaxRule}
                        handleSubmit={update}
                    />
                </div>
            </Modal>
        </>
    )
}
