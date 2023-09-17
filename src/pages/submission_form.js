
import {FormControl} from 'react-bootstrap'
import React from 'react'
import "./submission_form.css";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row' 
import Col from 'react-bootstrap/Col'
//import {Text} from 'react-bootstrap/Text'

//import FormText from 'react-bootstrap/FormText'

function SubmissionForm(){

    
    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        console.log(payload)
    }
    return (
        
        <Form onSubmit={submitForm}>
        <Container> 
        <h6 class= "mt-3 text-muted d-flex justify-content-end"> *Mandatory Fields </h6>
        <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 align-items-left'>
            <Form.Label> Project Name*</Form.Label>
            <FormControl type="text" name="projectName" placeholder="Enter project name"/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 align-items-left'>
            <Form.Label>Project Version*</Form.Label>
            <FormControl type="text" name="projectVersion" placeholder="Enter project version"/>
        </Form.Group>
        </Col>
        </Row>
        
        
        
        
       <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 mb-3'>
            <Form.Label className = 'd-flex'>CCO Target</Form.Label>
            <FormControl type="date" name="ccoTarget"/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-4 mb-3'>
        <Form.Label className = 'd-flex'>CCO Commit</Form.Label>
            <FormControl type="date" name="ccoCommit"/>
        </Form.Group>
        </Col>
        </Row>
        <Row> 
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-2 mb-3'>
        <Form.Label className = 'd-flex'>CCO Actual</Form.Label>
            <FormControl type="date" name="ccoActual"/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className=' pl-4 pb-2 fw-bold text-muted mt-2 mb-3'>
        <Form.Label className = 'd-flex'>IC Date*</Form.Label>
            <FormControl type="date" name="icDate"/>
        </Form.Group>
        </Col>
        </Row>

        <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-2'>
            <Form.Label> Platform Type*</Form.Label>
            <Form.Select size = "md" name = "platform_type">
                <option value= "">-Select-</option>
                <option value="csaas">CSaaS</option>
                <option value="appd_cloud">Appd Cloud</option>
                <option value="on-prem">On-Prem</option>
                <option value="fso">FSO</option>
            </Form.Select>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-2 mr-5'>
            <Form.Label>Status*</Form.Label>
            <Form.Select size = "md" name = "status">
                <option value= "">-Select-</option>
                <option value="onTrack">On Track</option>
                <option value="delayed">Delayed</option>
                <option value="missed">Missed</option>
                </Form.Select>
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-3 ml-5'>
            <Form.Label>Release Status*</Form.Label>
            <Form.Select size= "md" name="releaseStatus">
                <option value= "">-Select-</option>
                <option value="onTrack">On Track</option>
                <option value="delayed">Delayed</option>
                <option value="missed">Missed</option>
            </Form.Select>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-3 mr-5'>
            <Form.Label>Release Type*</Form.Label>
            <Form.Select size = "md" name="releaseType">
                <option value= "">-Select-</option>
                <option value="option1">On Track</option>
                <option value="option2">Delayed</option>
                <option value="option3">Missed</option>
            </Form.Select>
        </Form.Group>
        </Col>
        </Row>
        
    

        <Form.Group className='pb-2 fw-bold text-muted mt-4 align-items-left'>
            <Form.Label>Release Content</Form.Label>
            <Form.Control as="textarea" aria-label="With textarea" rows={6} />
        </Form.Group>

        <Form.Group className='fw-bold text-muted mt-3 align-items-left'>
            <Form.Label>CSDL URL</Form.Label>
            <FormControl type="text" name="csldUrl"/>
        </Form.Group>

        <p class="text-left text-size text-danger"><small> * if CSDL is not applicable please mark it as N/A </small> </p>

        <Form.Group className='fw-bold text-muted mt-3 align-items-left'>
            <Form.Label>TIMS SIT URL</Form.Label>
            <FormControl type="text" name="timsSitUrl"/>
        </Form.Group>
        <Row class= "Row align-items-center inline">
        <Col>
        <h4 class = "mt-3 text-bold"> Queries </h4>
        <Form.Group className='fw-bold text-muted mt-3 pb-3 align-items-left'>
            <Form.Label>TS Attribute</Form.Label>
            <FormControl type="text" name="tsAttribute"/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='fw-bold text-muted pb-3 mt-5 align-items-left'>
            <Form.Label>SS Attribute</Form.Label>
            <FormControl type="text" name="ssAttribute"/>
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
        <Form.Group className='fw-bold text-muted mt-3 align-items-left'>
            <Form.Label>Backlog</Form.Label>
            <FormControl type="text" name="backlog"/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='fw-bold text-muted mt-3 align-items-left'>
            <Form.Label>PSIRT Opened</Form.Label>
            <FormControl type="text" name="psirtOpened"/>
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
        <Form.Group className='fw-bold text-muted mt-3 align-items-left'>
            <Form.Label>PSIRT Closed</Form.Label>
            <FormControl type="text" name="psirtClosed"/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='fw-bold text-muted mt-3 align-items-left'>
            <Form.Label>R-V Verified</Form.Label>
            <FormControl type="text" name="rvVerified"/>
        </Form.Group>
        </Col>
        </Row>
        <div className="mt-4" submitButton>
            <Button variant="primary" type="submit">
                 Submit
            </Button>
        </div>
        </Container>
      </Form>
       
    )
}

export default SubmissionForm;

