import {
  Card, CardHeader, CardBody, Col, Nav, Row, Button, Modal,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import Jsona from 'jsona';
import ReactTable from '../../components/ReactTable/ReactTable';
import apiCall from '../../helpers/apiCall';
import TaxRuleItemForm from '../../components/Forms/TaxRuleItemForm';

export default function TaxRuleItemDashboard(props) {
  const [taxRuleItems, setTaxRuleItems] = useState([]);
  const [taxRuleItem, setTaxRuleItem] = useState({});
  const [createTaxRuleItem, setCreateTaxRuleItem] = useState(false);
  const [updateTaxRuleItem, setUpdateTaxRuleItem] = useState(false);
  const [taxRuleItemId, setTaxRuleItemId] = useState();

  useEffect(() => {
    apiCall.fetchEntities('/tax_rule_items.json')
      .then((res) => {
        const dataFormatter = new Jsona();
        setTaxRuleItems(dataFormatter.deserialize(res.data));
      });
  }, []);

  const create = () => {
    apiCall.submitEntity({ tax_rule_item: taxRuleItem }, '/tax_rule_items.json')
      .then((res) => {
        const dataFormatter = new Jsona();
        const taxRuleItem = dataFormatter.deserialize(res.data);
        setTaxRuleItems([...taxRuleItems, taxRuleItem]);
        setCreateTaxRuleItem(false);
      });
  };

  const update = () => {
    apiCall.submitEntity({ tax_rule_item: taxRuleItem }, `/tax_rule_items/${taxRuleItemId}.json`, 'PATCH')
      .then((res) => {
        const dataFormatter = new Jsona();
        const updatedTaxRuleItem = dataFormatter.deserialize(res.data);
        const taxRuleItemIndex = taxRuleItems.findIndex((taxRuleItem) => taxRuleItem.id === updatedTaxRuleItem.id);
        taxRuleItems.splice(taxRuleItemIndex, 1, updatedTaxRuleItem);
        setTaxRuleItems(taxRuleItems);

        // close the modal form
        setUpdateTaxRuleItem(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onRowClick = (state, rowInfo) => ({
    onClick: (e) => {
      setUpdateTaxRuleItem(true);
      setTaxRuleItemId(rowInfo.original.id);
      setTaxRuleItem(rowInfo.original);
      console.log(rowInfo.original);
    },
  });

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
            <Button
              color="success"
              size="sm"
              className="mb-2"
              onClick={() => {
                setCreateTaxRuleItem(true);
                setTaxRuleItem({});
              }}
            >
              New Tax Rule
            </Button>
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
              getTrProps={onRowClick}
            />
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={createTaxRuleItem}
        toggle={() => setCreateTaxRuleItem(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header p-1">
          <button
            aria-hidden
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setCreateTaxRuleItem(false)}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>

        <div className="modal-body">
          <TaxRuleItemForm
            taxRuleItem={taxRuleItem}
            setTaxRuleItem={setTaxRuleItem}
            handleSubmit={create}
          />
        </div>
      </Modal>

      <Modal
        isOpen={updateTaxRuleItem}
        toggle={() => setUpdateTaxRuleItem(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header p-1">
          <button
            aria-hidden
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setUpdateTaxRuleItem(false)}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>

        <div className="modal-body">
          <TaxRuleItemForm
            taxRuleItem={taxRuleItem}
            setTaxRuleItem={setTaxRuleItem}
            handleSubmit={update}
          />
        </div>
      </Modal>
    </>
  );
}
