import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Table, Button } from "reactstrap";
import axios from "axios";
import Swal from 'sweetalert2'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://agentsapp.vercel.app/api/addUsers/getUser"); // Replace with the correct API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    navigate("/form-validation", { state: { user } }); // Pass user data via state
  };

  const handleDelete = async (userId) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (confirm.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/addUsers/deleteUser/${userId}`);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        // Refresh the page or reload the data here
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete user.', 'error');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Table className="align-middle">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Official Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.officialEmail}</td>
              <td>
                <Button color="primary" size="sm"  onClick={() => handleEdit(user)}>
                  Edit
                </Button>{" "}
                <Button color="danger" size="sm" onClick={() => handleDelete(user.userId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
