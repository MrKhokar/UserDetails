import React, { useState, useEffect } from "react";
import Interface from "./Interface";

const UserTable = () => {
  const [currentId, setCurrentId] = useState("");
  const [Users, setUsers] = useState([]);
  const saveandedit = (obj) => {
    let existingUser = localStorage.getItem("user");
    let olduser = JSON.parse(existingUser);
    if (currentId === "") {
      if (existingUser && existingUser.length) {
        olduser.push(obj);
        console.log(olduser);

        localStorage.setItem(
          "user",
          JSON.stringify(olduser)
        );
        setUsers(olduser);
      } else {
        Users.push(obj);
        localStorage.setItem("user", JSON.stringify(Users));
      }
    } else {
      olduser[currentId] = obj;
      localStorage.setItem("user", JSON.stringify(olduser));
      setUsers(olduser);
      setCurrentId("");
    }
  };
  const data = () => {
    const userOnLocalStorage = JSON.parse(
      localStorage.getItem("user")
    );
    if (
      localStorage.getItem("user") &&
      localStorage.getItem("user").length
    ) {
      setUsers(userOnLocalStorage);
    } else {
      setUsers([]);
    }
  };
  const onDelete = (key) => {
    if (
      window.confirm("Are you want to delete the contact?")
    ) {
      let existingUser = localStorage.getItem("user");
      let olduser = JSON.parse(existingUser);
      olduser.splice(key, 1);
      localStorage.setItem("user", JSON.stringify(olduser));
      console.log(olduser);

      setUsers(olduser);

      console.log(Users);
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <Interface {...{ saveandedit, Users, currentId }} />
      <h3 className="text-center mt-3">User List</h3>
      <table className="table table-borderless table-stripped">
        <thead className="theade-light">
          <tr>
            <th>Frist Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(Users).map((id) => (
            <tr key={id}>
              <td>{Users[id].fname}</td>
              <td>{Users[id].lname}</td>
              <td>{Users[id].email}</td>
              <td>{Users[id].phone}</td>
              <td>
                <div className="">
                  <button className="btn text-primary">
                    <i
                      className="fas fa-pencil-alt"
                      onClick={() => {
                        setCurrentId(id);
                      }}
                    />
                  </button>
                  <button className="btn text-danger">
                    <i
                      className="fas fa-trash-alt"
                      onClick={() => {
                        onDelete(id);
                      }}
                    />
                  </button>
                </div>
              </td>
            </tr>
            // Here by means of Object.keys we take the keys that means id inside of the object that contain data then by that id we ittrate to the object
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
