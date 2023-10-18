import {FormControl} from 'react-bootstrap'
import React, {useState, useRef} from 'react';
import "./submission_form.css";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from '@mui/material/Box';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../graphql/mutations.js';
//import {Text} from 'react-bootstrap/Text'

//import FormText from 'react-bootstrap/FormText'


function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Ensure month and day have two digits
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
}


function SubmissionForm(){
    const formRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        projectName: false,
        projectVersion: false,
        icDate: false,
        platform_type: false,
        status: false,
        releaseStatus: false,
        releaseType: false,
    });
    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let isValid = true;
    
        // Define an array of valid input field names
        const validFieldNames = ["projectName", "projectVersion", "icDate", "platform_type", "status", "releaseStatus", "releaseType"];
    
        // Perform validation based on the input field name
        if (validFieldNames.includes(name)) {
            isValid = value.trim() !== ''; 
        }
    
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !isValid,
        }));
    };
    
    
    

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        // Validate fields before submitting
        const hasErrors = Object.values(validationErrors).some((error) => error);

        if (hasErrors) {
            console.log('Form has validation errors. Please check the fields.');
            return;
        }


        try {
            const response = await API.graphql(graphqlOperation(createTodo, { input: payload }));
            console.log('Data stored in Cosmos DB:', response);
            formRef.current.reset();
            window.scrollTo(0, 0);
            setSuccessMessage('Form submitted successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error storing data:', error);
        }

    }
    return (
        <Box sx={{ marginLeft: 8 }}>
        <Form ref={formRef} onSubmit={submitForm}>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <Container> 
        <h6 class= "mt-3 text-muted d-flex justify-content-end"> *Mandatory Fields </h6>
        <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 align-items-left'>
            <Form.Label> Project Name*</Form.Label>
            <FormControl type="text" name="projectName" placeholder="Enter project name" required onChange={handleInputChange} className={validationErrors.projectName ? 'is-invalid' : ''}/>
            {validationErrors.projectName && <div className="invalid-feedback">Project Name is required.</div>}
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 align-items-left'>
            <Form.Label>Project Version*</Form.Label>
            <FormControl type="text" name="projectVersion" placeholder="Enter project version" required onChange={handleInputChange} className={validationErrors.projectVersion ? 'is-invalid' : ''}/>
            {validationErrors.projectVersion && <div className="invalid-feedback">Project Version is required.</div>}

        </Form.Group>
        </Col>
        </Row>
    
       <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 mb-3'>
            <Form.Label className = 'd-flex'>GA Target</Form.Label>
            <FormControl type="date" name="ccoTarget" min={getCurrentDate()}/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-4 mb-3'>
        <Form.Label className = 'd-flex'>GA Commit</Form.Label>
            <FormControl type="date" name="ccoCommit" min={getCurrentDate()}/>
        </Form.Group>
        </Col>
        </Row>
        <Row> 
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-2 mb-3'>
        <Form.Label className = 'd-flex'>GA Actual</Form.Label>
            <FormControl type="date" name="ccoActual" min={getCurrentDate()}/>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className=' pl-4 pb-2 fw-bold text-muted mt-2 mb-3'>
        <Form.Label className = 'd-flex'>IC Date*</Form.Label>
            <FormControl type="date" name="icDate" required onChange={handleInputChange} className={validationErrors.icDate ? 'is-invalid' : ''}/>
            {validationErrors.projectVersion && <div className="invalid-feedback">IC Date is required.</div>}
        </Form.Group>
        </Col>
        </Row>

        <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-2'>
            <Form.Label> Platform Type*</Form.Label>
            <Form.Select size = "md" name = "platform_type" required onChange={handleInputChange} className={validationErrors.platform_type ? 'is-invalid' : ''}>
                <option value= "">-Select-</option>
                <option value="csaas">CSaaS</option>
                <option value="appd_cloud">Appd Cloud</option>
                <option value="on-prem">On-Prem</option>
                <option value="fso_and_cnao">FSO and CNAO</option>
            </Form.Select>
            {validationErrors.projectVersion && <div className="invalid-feedback">Platform Type is required.</div>}
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-2 mr-5'>
            <Form.Label>Status*</Form.Label>
            <Form.Select size = "md" name = "status" required onChange={handleInputChange} className={validationErrors.status ? 'is-invalid' : ''}>
                <option value= "">-Select-</option>
                <option value="onTrack">On Track</option>
                <option value="delayed">Delayed</option>
                <option value="missed">Missed</option>
                </Form.Select>
                {validationErrors.projectVersion && <div className="invalid-feedback">Status is required.</div>}
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-3 ml-5'>
            <Form.Label>Release Status*</Form.Label>
            <Form.Select size= "md" name="releaseStatus" required onChange={handleInputChange} className={validationErrors.releaseStatus ? 'is-invalid' : ''}>
                <option value= "">-Select-</option>
                <option value="onTrack">On Track</option>
                <option value="delayed">Delayed</option>
                <option value="missed">Missed</option>
            </Form.Select>
            {validationErrors.projectVersion && <div className="invalid-feedback">Release Status is required.</div>}
        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-3 mr-5'>
            <Form.Label>Release Type*</Form.Label>
            <Form.Select size = "md" name="releaseType" required onChange={handleInputChange} className={validationErrors.releaseType ? 'is-invalid' : ''}>
                <option value= "">-Select-</option>
                <option value="option1">On Track</option>
                <option value="option2">Delayed</option>
                <option value="option3">Missed</option>
            </Form.Select>
            {validationErrors.projectVersion && <div className="invalid-feedback">Release Type is required.</div>}
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
      </Box>
    )
}

export default SubmissionForm;
