import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';

export default function SalarySettingForm(props) {
    const [taxRules, setTaxRules] = useState([])

    useEffect(() => {
        setTaxRules(props.defaultTaxRules || [])
    }, [])

    useEffect(() => {
        props.setSalarySetting({...props.salarySetting, tax_rules_attributes: taxRules})
    }, [taxRules])

    const addNewTaxRule = () => {
        const date = new Date()
        setTaxRules([...taxRules, {key: date.getTime()}])
    }

    // identifier could be taxRule.id or taxRule.key
    const updateTaxRules = (identifier, key, value)  => {
        const index = taxRules.findIndex((taxRule) => (taxRule.id == identifier || taxRule.key == identifier))
        taxRules[index][key] = value
        setTaxRules([...taxRules])
    }

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
                <Row>
                    <Col sm={12} md={6}>
                        <FormGroup>
                            <Label for='from_date'>From Date</Label>
                            <Input id='from_date'
                                   placeholder='Start Date of the salary setting'
                                   value={props.salarySetting.from_date}
                                   onChange={(e) => props.setSalarySetting({...props.salarySetting, from_date: e.target.value})}
                                   type='date'
                                   required
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                        <FormGroup>
                            <Label for='to_date'>To Date</Label>
                            <Input id='to_date'
                                   placeholder='End Date of the salary setting'
                                   value={props.salarySetting.to_date}
                                   onChange={(e) => props.setSalarySetting({...props.salarySetting, to_date: e.target.value})}
                                   type='date'
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className='mb-3'>
                    <h4>Tax Rules</h4>
                    {
                        taxRules.length <= 0 ? (<div>N/A</div>) :
                            taxRules.map((taxRule) => (
                                <div key={taxRule.id || taxRule.key}>
                                    <Row>
                                        <Col sm={12} md={6} lg={4}>
                                            <FormGroup>
                                                <Label for={`from_amount_${taxRule.id || taxRule.key}`}>Amount From</Label>
                                                <Input
                                                    id={`from_amount_${taxRule.id || taxRule.key}`}
                                                    value={taxRule.amount_from || ''}
                                                    type='number'
                                                    onChange={(e) => {
                                                        const identifier = taxRule.id || taxRule.key
                                                        updateTaxRules(identifier, 'amount_from', e.target.value)
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={6} lg={4}>
                                            <FormGroup>
                                                <Label for={`to_amount_${taxRule.id || taxRule.key}`}>Amount To</Label>
                                                <Input
                                                    id={`to_amount_${taxRule.id || taxRule.key}`}
                                                    value={taxRule.amount_to || ''}
                                                    type='number'
                                                    onChange={(e) => {
                                                        const identifier = taxRule.id || taxRule.key
                                                        updateTaxRules(identifier, 'amount_to', e.target.value)
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={6} lg={4}>
                                            <FormGroup>
                                                <Label for={`rate_${taxRule.id || taxRule.key}`}>Rate</Label>
                                                <Input
                                                    id={`rate_${taxRule.id || taxRule.key}`}
                                                    value={taxRule.rate || ''}
                                                    onChange={(e) => {
                                                        const identifier = taxRule.id || taxRule.key
                                                        updateTaxRules(identifier, 'rate', e.target.value)
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                    }
                </div>

                <Button
                    color='link mb-3'
                    size='sm'
                    type='button'
                    onClick={addNewTaxRule}
                >
                    Add Tax Rules
                </Button>
                <br/>
                <Button color='success' type='Submit'>Submit</Button>
            </Form>
        </>
    )
}
