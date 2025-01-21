import React, { useEffect,useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';// Import SweetAlert2

import { Row, Col, Button, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import Form from 'react-validation/build/form';
import ComponentCard from '../../components/ComponentCard';

const AddUsers = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    officialEmail: '',
    role: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (location.state?.user) {
      setFormData(location.state.user); // Pre-fill form with user data
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }
  
    if (formData.email === formData.officialEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email and Official Email should not be the same',
      });
      return;
    }
  
    if (!formData.role) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Role is required',
      });
      return;
    }
  
    // Construct the payload
    const payload = {
      username: formData.username,
      email: formData.email,
      officialEmail: formData.officialEmail,
      role: formData.role,
      state:formData.state,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };
  
    try {
      if (formData.userId) {
        // Update existing user
        const response = await axios.put(
          `http://localhost:5000/api/addUsers/updateUser/${formData.userId}`,
          payload
        );
  
        Swal.fire({
          icon: 'success',
          title: 'User Updated',
          text: `User updated successfully: ${response.data.message}`,
        });
      } else {
        // Create new user
        const response = await axios.post(
          'http://localhost:5000/api/addUsers/saveCreateUser',
          payload
        );
  
        Swal.fire({
          icon: 'success',
          title: 'User Added',
          text: `User added successfully: ${response.data.message}`,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
  
      const errorMessage = error.response?.data?.message || 'Error submitting form';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  };
  
  const handleCancel = () => {
    navigate('/tickt/ticket-list'); // Navigate to the User List page
  };
  
  

  return (
    <>
      <Row>
        <Col md="12">
          <ComponentCard title="Add New User">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-person"></i>
                  </InputGroupText>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-envelope"></i>
                  </InputGroupText>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label>Official Mail-id</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-envelope"></i>
                  </InputGroupText>
                  <Input
                    type="email"
                    name="officialEmail"
                    placeholder="Create a Email-id for user"
                    value={formData.officialEmail}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label>Role</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-person"></i>
                  </InputGroupText>
                  <Input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
                <FormGroup>
                    <Label>State</Label>
                    <Input type="select" name="Select Category">
                      <option>--Select your State--</option>
                      <option>Tamilnadu</option>
                      <option>Kerala</option>
                      <option>Andhra Pradesh</option>
                    </Input>
                  </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-lock"></i>
                  </InputGroupText>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-lock"></i>
                  </InputGroupText>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                <Button type="submit" className="btn btn-success">
                  Submit
                </Button>
                <Button type="button" className="btn btn-dark" onClick={handleCancel} >
                  Cancel
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default AddUsers;
