import React from 'react';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';

export default function TaxRuleItemForm(props) {
  return (
    <Form
      onSubmit={props.handleSubmit}
      data-remote
    >
      <FormGroup>
        <Label for="amount_from">Amount From</Label>
        <Input
          id="amount_from"
          placeholder="Starting salary amount for tax rule"
          required
          value={props.taxRuleItem.amount_from || ''}
          onChange={(e) => props.setTaxRuleItem({ ...props.taxRuleItem, amount_from: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="amount_to">Amount To</Label>
        <Input
          id="amount_to"
          placeholder="Max salary amount for tax rule"
          required
          value={props.taxRuleItem.amount_to || ''}
          onChange={(e) => props.setTaxRuleItem({ ...props.taxRuleItem, amount_to: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="rate">Rate</Label>
        <Input
          id="rate"
          placeholder="Tax deduction rate"
          required
          value={props.taxRuleItem.rate || ''}
          onChange={(e) => props.setTaxRuleItem({ ...props.taxRuleItem, rate: e.target.value })}
        />
      </FormGroup>
      <Button color="success" type="Submit">Submit</Button>
    </Form>
  );
}
