import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import axios from 'axios';

function HomePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleMenuClose(); // Close the menu after selection
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowEmployeeList(false);
  };

  const handleShowEmployeeList = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setEmployees(response.data);
      setShowEmployeeList(true);
      setShowForm(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setError('Error fetching employee data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Perform any necessary logout operations here (e.g., clearing tokens)
    navigate('/login'); // Navigate to the LoginPage
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'center', padding: '0 20px' }}>
          <Button color="inherit" onClick={handleShowForm}>
            Home
          </Button>
          <Button color="inherit" onClick={handleMenuClick}>
            {selectedLocation}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleLocationSelect('Location 1')}>Location 1</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Location 2')}>Location 2</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Location 3')}>Location 3</MenuItem>
          </Menu>
          <Button color="inherit" onClick={handleShowEmployeeList}>Employee List</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 20, padding: '0 20px' }}>
        {showForm && <EmployeeForm />}
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {showEmployeeList && !loading && !error && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>
                      {Array.isArray(employee.course) ? employee.course.join(', ') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {employee.image && <img src={`http://localhost:5000/uploads/${employee.image}`} alt="Employee" style={{ width: 50, height: 50 }} />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!showForm && !showEmployeeList && (
          <>
            <Typography variant="h4">Welcome to the Home Page</Typography>
            <Typography variant="body1" style={{ marginTop: 20 }}>
              This is the home page of your application. Use the navigation bar to access different sections.
            </Typography>
          </>
        )}
      </Container>
    </div>
  );
}

export default HomePage;
