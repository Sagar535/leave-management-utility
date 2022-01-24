import {
  Card, CardHeader, CardBody, Col, Nav, Row,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import Jsona from 'jsona';
import ReactTable from '../../components/ReactTable/ReactTable';
import apiCall from '../../helpers/apiCall';

export default function TaxRuleItemDashboard(props) {
  const [taxRuleItems, setTaxRuleItems] = useState([]);

  useEffect(() => {
    apiCall.fetchEntities('/tax_rule_items.json')
      .then((res) => {
        const dataFormatter = new Jsona();
        setTaxRuleItems(dataFormatter.deserialize(res.data));
      });
  }, []);

  return (
    <Card className="shadow mb-0">
      <CardHeader className="border-0 text-white bg-primary pb-6 px-5">
        <Row className="pt-4">
          <Col lg="6">
            <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
              Tax Rule Dashboard
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
          <ReactTable
            resizable={false}
            data={taxRuleItems}
            loading={false}
            columns={[
              {
                Header: 'Amount From',
                accessor: 'amount_from',
                style: { whiteSpace: 'unset' },
              },
              {
                Header: 'Amount To',
                accessor: 'amount_to',
                style: { whiteSpace: 'unset' },
              },
              {
                Header: 'Rate',
                accessor: 'rate',
                style: { whiteSpace: 'unset' },
              },
            ]}
            defaultPageSize={5}
            showPaginationBottom
            className="-striped -highlight text-capitalize"
          />
        </div>
      </CardBody>
    </Card>
  );
}
