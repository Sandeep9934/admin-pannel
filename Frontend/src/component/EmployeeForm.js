import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  Paper,
  Container,
  FormHelperText,
  Checkbox
} from '@mui/material';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const course = checked
          ? [...prevData.course, value]
          : prevData.course.filter((c) => c !== value);
        return { ...prevData, course };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.course.length === 0) newErrors.course = 'At least one course is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phoneNumber); // Match backend field
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('course', JSON.stringify(formData.course)); // Convert array to JSON string
        if (formData.image) formDataToSend.append('image', formData.image);

        const response = await axios.post('http://localhost:5000/api/users', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Employee Form
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.designation}>
            <InputLabel>Designation</InputLabel>
            <Select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              label="Designation"
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
            {errors.designation && <FormHelperText>{errors.designation}</FormHelperText>}
          </FormControl>
          <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
            <Typography variant="subtitle1" gutterBottom>
              Gender
            </Typography>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
          <FormControl component="fieldset" margin="normal" error={!!errors.course}>
            <Typography variant="subtitle1" gutterBottom>
              Course
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox checked={formData.course.includes('MCA')} onChange={handleChange} name="course" value="MCA" />}
                  label="MCA"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox checked={formData.course.includes('BCA')} onChange={handleChange} name="course" value="BCA" />}
                  label="BCA"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox checked={formData.course.includes('BSC')} onChange={handleChange} name="course" value="BSC" />}
                  label="BSC"
                />
              </Grid>
            </Grid>
            {errors.course && <FormHelperText>{errors.course}</FormHelperText>}
          </FormControl>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EmployeeForm;
