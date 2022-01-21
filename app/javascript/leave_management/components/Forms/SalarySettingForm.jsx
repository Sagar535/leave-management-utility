import React from 'react';
import {Button, Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import Select from 'react-select';

export default function SalarySettingForm(props) {
    return (
        <>
            <Form
                onSubmit={props.handleSubmit}
                data-remote={true}
            >
                <Row>
                    <Col sm={12} md={6}>
                        <FormGroup>
                            <Label for='ssf_office'>SSF Office</Label>
                            <Input id='ssf_office'
                                   placeholder='SSF Office value between 0 and 100'
                                   type='number'
                                   required
                                   min={0}
                                   max={100}
                                   value={props.salarySetting.ssf_office}
                                   onChange={(e) => props.setSalarySetting({...props.salarySetting, ssf_office: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup>
                            <Label for='ssf_employee'>SSF Employee</Label>
                            <Input id='ssf_employee'
                                   placeholder='SSF Employee value between 0 and 100'
                                   type='number'
                                   required
                                   min={0}
                                   max={100}
                                   value={props.salarySetting.ssf_employee}
                                   onChange={(e) => props.setSalarySetting({...props.salarySetting, ssf_employee: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label for='life_insurance_max'>Life Insurance Max</Label>
                    <Input id='life_insurance_max'
                           placeholder='Life insurance max'
                           required
                           value={props.salarySetting.life_insurance_max}
                           onChange={(e) => props.setSalarySetting({...props.salarySetting, life_insurance_max: e.target.value})}
                    />
                </FormGroup>

                <Row>
                    <Col sm={12} md={6}>
                        <FormGroup>
                            <Label for='ssf_tax_exemption_rate'>SSF Tax Exemption Rate</Label>
                            <Input id='ssf_tax_exemption_rate'
                                   placeholder='SSF Tax Exemption Rate'
                                   required
                                   value={props.salarySetting.ssf_tax_exemption_rate}
                                   onChange={(e) => props.setSalarySetting({...props.salarySetting, ssf_tax_exemption_rate: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup>
                            <Label for='ssf_tax_exemption_max'>SSF Tax Exemption Max</Label>
                            <Input id='ssf_tax_exemption_max'
                                   placeholder='SSF Tax Exemption Max'
                                   required
                                   value={props.salarySetting.ssf_tax_exemption_max}
                                   onChange={(e) => props.setSalarySetting({...props.salarySetting, ssf_tax_exemption_max: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label for='user_ids'>
                        Select Users
                    </Label>
                    <Select
                            isMulti
                            closeMenuOnSelect={false}
                            defaultValue={props.defaultUsers}
                            options={props.userOptions}
                            onChange={(selectedOptions) => {
                                props.setSalarySetting({...props.salarySetting, user_ids: selectedOptions.map((option) => option.value)})
                            }}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='tax_ids'>
                        Select Tax Rules
                    </Label>
                    <Select
                        isMulti
                        closeMenuOnSelect={false}
                        defaultValue={props.defaultTaxRules}
                        options={props.taxOptions}
                        onChange={(selectedOptions) => {
                            props.setSalarySetting({...props.salarySetting, tax_rule_ids: selectedOptions.map((option) => option.value)})
                        }}
                    />
                </FormGroup>
                <Button color='success' type='Submit'>Submit</Button>
            </Form>
        </>
    )
}
