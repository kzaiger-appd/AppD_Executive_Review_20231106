import {FormControl} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function SubmissionForm(){
    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        console.log(payload)
    }
    return (
        <form onSubmit={submitForm}>
        <Form.Group className='mb-3'>
            <Form.Label>Project Name</Form.Label>
            <FormControl type="text" name="projectName" placeholder="Enter project name"></FormControl>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Project Version</Form.Label>
            <FormControl type="text" name="projectVersion" placeholder="Enter project version"></FormControl>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>CCO Target</Form.Label>
            <FormControl type="date" name="ccoTarget"></FormControl>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>CCO Commit</Form.Label>
            <FormControl type="date" name="ccoCommit"></FormControl>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>CCO Actual</Form.Label>
            <FormControl type="date" name="ccoActual"></FormControl>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>IC Date</Form.Label>
            <FormControl type="date" name="icDate"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Platform Type</Form.Label>
            <select name="platform_type">
                <option value="csaas">CSaaS</option>
                <option value="appd_cloud">Appd Cloud</option>
                <option value="on-prem">On-Prem</option>
                <option value="fso">FSO</option>
            </select>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Status</Form.Label>
            <select name="status">
                <option value="onTrack">On Track</option>
                <option value="delayed">Delayed</option>
                <option value="missed">Missed</option>
            </select>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Release Status</Form.Label>
            <select name="releaseStatus">
                <option value="onTrack">On Track</option>
                <option value="delayed">Delayed</option>
                <option value="missed">Missed</option>
            </select>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Release Type</Form.Label>
            <select name="releaseType">
                <option value="option1">On Track</option>
                <option value="option2">Delayed</option>
                <option value="option3">Missed</option>
            </select>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Release Content</Form.Label>
            <FormControl type="text" name="releaseContent"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>CSDL URL</Form.Label>
            <FormControl type="text" name="csldUrl"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>TIMS SIT URL</Form.Label>
            <FormControl type="text" name="timsSitUrl"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>TS Attribute</Form.Label>
            <FormControl type="text" name="tsAttribute"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>SS Attribute</Form.Label>
            <FormControl type="text" name="ssAttribute"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Backlog</Form.Label>
            <FormControl type="text" name="backlog"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>PSIRT Opened</Form.Label>
            <FormControl type="text" name="psirtOpened"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>PSIRT Closed</Form.Label>
            <FormControl type="text" name="psirtClosed"></FormControl>
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>R->V Verified</Form.Label>
            <FormControl type="text" name="rvVerified"></FormControl>
        </Form.Group>

        <div className="submitButton">
            <Button variant="primary" type="submit">
                 Submit
            </Button>
        </div>
      </form>
    )
}

export default SubmissionForm;