import {FormControl, OverlayTrigger, Tooltip} from 'react-bootstrap'
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
// import Tooltip from 'react-bootstrap/Tooltip';
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
        ccoCommit: false,
        ccoTarget: false,
        ccoActual: false,
        icDate: false,
        platform_type: false,
        status: false,
        releaseStatus: false,
        releaseType: false,
        csldUrl: false,
        timsSitUrl: false,
    });
    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let isValid = true;
    
        // Define an array of valid input field names
        const validFieldNames = ["projectName", "projectVersion", "ccoCommit", "ccoTarget", "ccoActual", "icDate", "platform_type", "status", "releaseStatus", "releaseType", "csldUrl", "timsSitUrl"];
    
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
        {/* <h12 class= "mt-3 text-muted d-flex justify-content-end"> *Mandatory Fields </h12> */}
        <Row className="reduce-top-padding">
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 align-items-left'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-projectName`}>
                                        Additional information about Project Name.
                                    </Tooltip>
                                }
                            >
                                <div>
                                    <Form.Label> Project Name*</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="projectName"
                                        placeholder="Enter project name"
                                        required
                                        onChange={handleInputChange}
                                        className={`form-control ${
                                            validationErrors.projectName ? 'is-invalid' : ''
                                        } form-control-sm`}
                                    />
                                </div>
                            </OverlayTrigger>
                            {validationErrors.projectName && (
                                <div className="invalid-feedback">Project Name is required.</div>
                            )}
                        </Form.Group>
        </Col>
        <Col>
        <Form.Group className='pb-2 fw-bold text-muted mt-4 align-items-left'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-projectVersion`}>
                                        Additional information about Project Version.
                                    </Tooltip>
                                }
                            >
                                <div>
                                    <Form.Label> Project Version*</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="projectVersion"
                                        placeholder="Enter project version"
                                        required
                                        onChange={handleInputChange}
                                        className={`form-control ${
                                            validationErrors.projectVersion ? 'is-invalid' : ''
                                        } form-control-sm`}
                                    />
                                </div>
                            </OverlayTrigger>
                            {validationErrors.projectVersion && (
                                <div className="invalid-feedback">Project Version is required.</div>
                            )}
                        </Form.Group>
        </Col>
        </Row>
    
        <Row>
                    <Col>
                        <Form.Group className='pb-2 fw-bold text-muted mt-3 mb-3'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-ccoCommit`}>
                                        Enter the GA Commit date.
                                    </Tooltip>
                                }
                            >
                                <Form.Label className='d-flex'>GA Commit*</Form.Label>
                            </OverlayTrigger>
                            <FormControl
                                type="date"
                                name="ccoCommit"
                                min={getCurrentDate()}
                                required
                                onChange={handleInputChange}
                                className={`form-control ${validationErrors.ccoCommit ? 'is-invalid' : ''} form-control-sm`}
                            />
                            {validationErrors.ccoCommit && (
                                <div className="invalid-feedback">GA Commit is required.</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='pb-2 fw-bold text-muted mt-3 mb-3'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-ccoTarget`}>
                                        Enter the GA Target date.
                                    </Tooltip>
                                }
                            >
                                <Form.Label className='d-flex'>GA Target*</Form.Label>
                            </OverlayTrigger>
                            <FormControl
                                type="date"
                                name="ccoTarget"
                                min={getCurrentDate()}
                                required
                                onChange={handleInputChange}
                                className={`form-control ${validationErrors.ccoTarget ? 'is-invalid' : ''} form-control-sm`}
                            />
                            {validationErrors.ccoTarget && (
                                <div className="invalid-feedback">GA Target is required.</div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className='pb-2 fw-bold text-muted mt-3 mb-3'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-ccoActual`}>
                                        Enter the GA Actual date.
                                    </Tooltip>
                                }
                            >
                                <Form.Label className='d-flex'>GA Actual*</Form.Label>
                            </OverlayTrigger>
                            <FormControl
                                type="date"
                                name="ccoActual"
                                min={getCurrentDate()}
                                required
                                onChange={handleInputChange}
                                className={`form-control ${validationErrors.ccoActual ? 'is-invalid' : ''} form-control-sm`}
                            />
                            {validationErrors.ccoActual && (
                                <div className="invalid-feedback">GA Actual is required.</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className=' pl-4 pb-2 fw-bold text-muted mt-3 mb-3'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-icDate`}>
                                        Enter the IC Date.
                                    </Tooltip>
                                }
                            >
                                <Form.Label className='d-flex'>IC Date*</Form.Label>
                            </OverlayTrigger>
                            <FormControl
                                type="date"
                                name="icDate"
                                required
                                onChange={handleInputChange}
                                className={`form-control ${validationErrors.icDate ? 'is-invalid' : ''} form-control-sm`}
                            />
                            {validationErrors.icDate && (
                                <div className="invalid-feedback">IC Date is required.</div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

        <Row>
        <Col>
                        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-3 mb-2 mr-5'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-status`}>
                                        Select the Program Status.
                                    </Tooltip>
                                }
                            >
                                <Form.Label>Program Status*</Form.Label>
                            </OverlayTrigger>
                            <Form.Select
                                name="status"
                                required
                                onChange={handleInputChange}
                                className={`form-control ${
                                    validationErrors.status ? 'is-invalid' : ''
                                } form-control-sm`}
                            >
                                <option value="">-Select-</option>
                                <option value="onTrack">On Track</option>
                                <option value="delayed">Delayed</option>
                                <option value="missed">Missed</option>
                            </Form.Select>
                            {validationErrors.status && (
                                <div className="invalid-feedback">Program Status is required.</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-3 mb-2 mr-5'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-platformType`}>
                                        Select the Platform Type.
                                    </Tooltip>
                                }
                            >
                                <Form.Label>Platform Type*</Form.Label>
                            </OverlayTrigger>
                            <Form.Select
                                name="platform_type"
                                required
                                onChange={handleInputChange}
                                className={`form-control ${
                                    validationErrors.platform_type ? 'is-invalid' : ''
                                } form-control-sm`}
                            >
                                <option value="">-Select-</option>
                                <option value="csaas">CSaaS</option>
                                <option value="appd_cloud">Appd Cloud</option>
                                <option value="on-prem">On-Prem</option>
                                <option value="fso_and_cnao">FSO and CNAO</option>
                            </Form.Select>
                            {validationErrors.platform_type && (
                                <div className="invalid-feedback">Platform Type is required.</div>
                            )}
                        </Form.Group>
                    </Col>
        </Row>
        <Row>
                    <Col>
                        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-3 mb-2 mr-5'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-releaseStatus`}>
                                        Select the Program Phase.
                                    </Tooltip>
                                }
                            >
                                <Form.Label>Program Phase*</Form.Label>
                            </OverlayTrigger>
                            <Form.Select
                                name="releaseStatus"
                                required
                                onChange={handleInputChange}
                                className={`form-control ${
                                    validationErrors.releaseStatus ? 'is-invalid' : ''
                                } form-control-sm`}
                            >
                                <option value="">-Select-</option>
                                <option value="ic">IC</option>
                                <option value="fcs">FCS</option>
                                <option value="ga">GA</option>
                            </Form.Select>
                            {validationErrors.releaseStatus && (
                                <div className="invalid-feedback">Program Phase is required.</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='pl-4 pb-2 fw-bold text-muted mt-3 mb-2 mr-5'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-releaseType`}>
                                        Select the Program Type.
                                    </Tooltip>
                                }
                            >
                                <Form.Label>Program Type*</Form.Label>
                            </OverlayTrigger>
                            <Form.Select
                                size="sm"
                                name="releaseType"
                                required
                                onChange={handleInputChange}
                                className={`form-control ${
                                    validationErrors.releaseType ? 'is-invalid' : ''
                                } form-control-sm`}
                            >
                                <option value="">-Select-</option>
                                <option value="option1">Feature</option>
                                <option value="option2">Maintenance</option>
                            </Form.Select>
                            {validationErrors.releaseType && (
                                <div className="invalid-feedback">Program Type is required.</div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
        
        <Row>
                    <Col>
                        <Form.Group className='pb-2 fw-bold text-muted mt-3 align-items-left'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-programContent`}>
                                        Enter program content details.
                                    </Tooltip>
                                }
                            >
                                <Form.Label>Program Content*</Form.Label>
                            </OverlayTrigger>
                            <Form.Control
                                size="sm"
                                as="textarea"
                                aria-label="With textarea"
                                rows={1}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='pb-2 fw-bold text-muted mt-3 align-items-left'>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-csldUrl`}>
                                        Enter the CSDL URL.
                                    </Tooltip>
                                }
                            >
                                <Form.Label>CSDL URL*</Form.Label>
                            </OverlayTrigger>
                            <FormControl
                                size="sm"
                                type="text"
                                name="csldUrl"
                                className={`form-control ${
                                    validationErrors.csldUrl ? 'is-invalid' : ''
                                } form-control-sm`}
                            />
                            {validationErrors.csldUrl && (
                                <div className="invalid-feedback">
                                    CSDL URL is required.
                                </div>
                            )}
                            {/* <p className="text-left text-size text-danger"><small>* If CSDL is not applicable please mark it as N/A</small></p> */}
                        </Form.Group>
                    </Col>
</Row>

<Row>
    <Col xs={6}>
        <Form.Group className='pb-2 fw-bold text-muted mt-3 align-items-left'>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id={`tooltip-timsSitUrl`}>
                        Enter the test URL.
                    </Tooltip>
                }
            >
                <Form.Label>Test URL*</Form.Label>
            </OverlayTrigger>
            <FormControl
                size="sm"
                type="text"
                name="timsSitUrl"
                className={`form-control ${
                    validationErrors.timsSitUrl ? 'is-invalid' : ''
                } form-control-sm`}
            />
            {validationErrors.timsSitUrl && (
                <div className="invalid-feedback">
                    Test URL is required.
                </div>
            )}
        </Form.Group>
    </Col>
    <Col xs={2} className="d-flex align-items-end mt-4">
        <Button variant="primary" type="submit" className="w-100" size="sm">
            Submit
        </Button>
    </Col>
</Row>

        </Container>
      </Form>
      </Box>
    )
}

export default SubmissionForm;
