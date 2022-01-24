import React from 'react';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';
import Select from 'react-select';

export default function TaxRuleForm(props) {
  return (
    <Form
      onSubmit={props.handleSubmit}
      data-remote
    >
      <FormGroup>
        <Label for="name">Tax Name</Label>
        <Input
          id="name"
          placeholder="Tax Name"
          required
          value={props.taxRule.name || ''}
          onChange={(e) => props.setTaxRule({ ...props.taxRule, name: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="from_date">From Date</Label>
        <Input
          id="from_date"
          placeholder="Begin Date for Tax Rule"
          type="date"
          required
          value={props.taxRule.from_date || ''}
          onChange={(e) => props.setTaxRule({ ...props.taxRule, from_date: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="to_date">To Date</Label>
        <Input
          id="to_date"
          placeholder="End Date for Tax Rule"
          required
          type="date"
          value={props.taxRule.to_date || ''}
          onChange={(e) => props.setTaxRule({ ...props.taxRule, to_date: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="tax_rule_item_ids">
          Select Tax Rule Items
        </Label>
        <Select
          isMulti
          closeMenuOnSelect={false}
          defaultValue={props.defaultTaxRuleItems}
          options={props.taxRuleItemOptions}
          onChange={(selectedOptions) => {
            props.setTaxRule({ ...props.taxRule, tax_rule_item_ids: selectedOptions.map((option) => option.value) });
          }}
        />
      </FormGroup>
      <Button color="success" type="Submit">Submit</Button>
    </Form>
  );
}
