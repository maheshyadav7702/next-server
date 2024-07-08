import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [list, setList] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/users?keyword=mahesh&rowsPerpage=2&currentPage=1"
      );

      setList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {
        <table border={1} width="100%" style={{ textAlign: "left" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Pin</th>
            </tr>
          </thead>
          <tbody>
            {list?.length > 0 &&
              list?.map((user) => (
                <tr key={user._id}>
                  <td>{user?.name}</td>
                  <td>{user.email}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.pin}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default UsersList;
