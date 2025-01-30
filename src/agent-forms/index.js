import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Button,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormText,
} from 'reactstrap';
import AuthLogo from '../layouts/logo/AuthLogo';

const FormAgent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    mobileNumber: '',
    address: {
      street: '',
      wardNumber: '',
      constituency: '',
      city: '',
      district:'',
      state: '',
      postCode: '',
      country: '',
    },
    documents: {
      aadhar: null,
      pan: null,
      voterId: null,
    },
  });
  const stateDistricts = {
    Tamilnadu: [
        'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 
        'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Kanyakumari', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram',
        'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur',
        'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
    ],
    Kerala: [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thrissur',
        'Thiruvananthapuram', 'Wayanad'
    ],
    AndraPradesh: [
        'Anakapalli', 'Anantapur', 'Annamayya', 'Bapatla', 'Chittoor', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'Eluru', 'Guntur', 'Kadapa', 'Kakinada',
        'Krishna', 'Kurnool', 'Nandyal', 'Nellore', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Prakasam', 'Srikakulam', 'Tirupati', 'Visakhapatnam',
        'Vizianagaram', 'West Godavari', 'YSR Kadapa'
    ]
};
  
  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [key, subKey] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle file uploads for document fields
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: files[0],
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Show loading spinner
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we save the agent details.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'documents') {
          Object.keys(formData.documents).forEach((docKey) => {
            if (formData.documents[docKey]) {
              payload.append(docKey, formData.documents[docKey]);
            }
          });
        } else if (key === 'address') {
          Object.keys(formData.address).forEach((subKey) => {
            payload.append(`address.${subKey}`, formData.address[subKey]);
          });
        } else {
          payload.append(key, formData[key]);
        }
      });
  
      await axios.post('https://agentsapp.vercel.app/api/agents/create', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('FormData:', Array.from(payload.entries()));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Agent saved successfully!',
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save agent. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
      });
    }
  };
  

  return (
    <div className="agentform">
      <Container  className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="agentformcontainer">
            <AuthLogo />
            <Card>
              <CardBody className="bg-light">
                <CardTitle tag="h4" className="mb-0">
                  Person Info
                </CardTitle>
              </CardBody>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  {/* Personal Info Section */}
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>First Name</Label>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <FormText className="muted">Enter your first name</FormText>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Last Name</Label>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        <FormText className="muted">Enter your last name</FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Gender</Label>
                        <Input
                          type="select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">--Select Gender--</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Mobile Number</Label>
                        <Input
                          type="text"
                          name="mobileNumber"
                          placeholder="Mobile Number"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* Address Section */}
                  <CardBody className="bg-light">
                    <CardTitle tag="h4" className="mb-0">
                      Address
                    </CardTitle>
                  </CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Street</Label>
                        <Input
                          type="text"
                          name="address.street"
                          placeholder="Street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Ward Number</Label>
                        <Input
                          type="text"
                          name="address.wardNumber"
                          placeholder="Ward Number"
                          value={formData.address.wardNumber}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Constituency</Label>
                        <Input
                          type="text"
                          name="address.constituency"
                          placeholder="Constituency"
                          value={formData.address.constituency}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>City</Label>
                        <Input
                          type="text"
                          name="address.city"
                          placeholder="City"
                          value={formData.address.city}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
        <FormGroup>
          <Label>State</Label>
          <Input
            type="select"
            name="address.state"
            value={formData.address.state}
            onChange={handleInputChange}
          >
            <option value="">--Select State--</option>
            {Object.keys(stateDistricts).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>

      <Col md="6">
        <FormGroup>
          <Label>District</Label>
          <Input
            type="select"
            name="address.district"
            value={formData.address.district}
            onChange={handleInputChange}
            disabled={!formData.address.state} // Disable if state not selected
          >
            <option value="">--Select District--</option>
            {formData.address.state &&
              stateDistricts[formData.address.state].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </Input>
        </FormGroup>
      </Col>
                    
                    <Col md="6">
                      <FormGroup>
                        <Label>Post Code</Label>
                        <Input
                          type="text"
                          name="address.postCode"
                          placeholder="Post Code"
                          value={formData.address.postCode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Country</Label>
                        <Input
                          type="select"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                        >
                          <option value="">--Select Country--</option>
                          <option value="India">India</option>
                          <option value="India">US</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* Documents Section */}
                  <CardBody className="bg-light">
                    <CardTitle tag="h4" className="mb-0">
                      Documents
                    </CardTitle>
                  </CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Aadhar Card</Label>
                        <Input
                          type="file"
                          name="aadhar"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Pan Card</Label>
                        <Input
                          type="file"
                          name="pan"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Voter ID</Label>
                        <Input
                          type="file"
                          name="voterId"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* Save and Cancel Buttons */}
                  <CardBody className="border-top gap-2 d-flex align-items-center">
                    <Button type="submit" className="btn btn-success">
                      Save
                    </Button>
                    <Button type="button" className="btn btn-dark ml-2">
                      Cancel
                    </Button>
                  </CardBody>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormAgent;


