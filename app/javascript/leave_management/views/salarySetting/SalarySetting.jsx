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
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import Jsona from 'jsona';
import apiCall from '../../helpers/apiCall';
import SalarySettingForm from '../../components/Forms/SalarySettingForm';

export default function SalarySetting(props) {
  const { id } = useParams();
  const [salarySetting, setSalarySetting] = useState({});
  const [updateSalarySetting, setUpdateSalarySetting] = useState(false);
  const [defaultTaxRules, setDefaultTaxRules] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const dataFormatter = new Jsona();

    apiCall.fetchEntities(`/salary_settings/${id}`)
      .then((res) => {
        const salary_setting = dataFormatter.deserialize(res.data);
        setSalarySetting(salary_setting);
        setEditable(salary_setting['latest?']);
      });
  }, []);

  // runs everytime salary setting is updated
  // sets default users and tax rules
  useEffect(() => {
    if (salarySetting.tax_rules !== undefined) {
      setDefaultTaxRules(salarySetting.tax_rules);
    }
  }, [salarySetting]);

  const update = () => {
    apiCall.submitEntity({ salary_setting: salarySetting }, `/salary_settings/${salarySetting.id}`, 'PUT')
      .then((res) => {
        const dataFormatter = new Jsona();
        const salary_setting = dataFormatter.deserialize(res.data);
        setSalarySetting(salary_setting);
        setUpdateSalarySetting(false);
      });
  };

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
            <Button color="success" size="sm" className="mb-2" disabled={!editable} onClick={() => setUpdateSalarySetting(true)}>
              Edit
            </Button>
            <Row>
              <Col sm={12} md={6} lg={4} className="mt-5">
                <h1>Salary setting</h1>
                <ListGroup>
                  {
                                        Object.keys(salarySetting).filter((key) => ['ssf_office', 'ssf_employee', 'ssf_tax_exemption_max', 'life_insurance_max', 'ssf_tax_exemption_rate', 'from_date', 'to_date'].includes(key))
                                          .map((salarySettingKey, index) => (
                                            <ListGroupItem key={index}>
                                              {salarySettingKey}
                                              {' '}
                                              :
                                              {salarySetting[salarySettingKey]}
                                            </ListGroupItem>
                                          ))
                                    }
                </ListGroup>
              </Col>

              <Col sm={12} md={6} lg={4} className="mt-5">
                <h1>Tax Rules</h1>
                <ListGroup>
                  {
                                        defaultTaxRules.length > 0
                                          ? defaultTaxRules.map((tax_rule, index) => (
                                            <ListGroupItem key={index}>
                                              {tax_rule.name}
                                            </ListGroupItem>
                                          ))
                                          : 'N/A'
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
            defaultTaxRules={defaultTaxRules}
            handleSubmit={update}
          />
        </div>
      </Modal>
    </>
  );
}
