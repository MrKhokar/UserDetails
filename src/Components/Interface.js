import React, { useState, useEffect } from "react";

const Interface = (props) => {
  const initValues = {
    fname: "",
    lname: "",
    email: "",
    phone: ""
  };
  useEffect(
    () => {
      if (props.currentId === "")
        setData(() => ({
          ...initValues
        }));
      else {
        setData(() => ({
          ...props.Users[props.currentId]
        }));
      }
    },
    [props.currentId, props.contactobj]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  );
  const [data, setData] = useState(initValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = (e) => {
    e.preventDefault();
    // const cvt=[...data]
    props.saveandedit(data);
    setData(() => ({ ...initValues }));
  };

  return (
    <>
      <h3 className="text-center">UserDetails</h3>
      <form
        className="row text-center "
        autoComplete="off"
        onSubmit={submit}>
        <input
          className="mt-2"
          name="fname"
          placeholder="Frist Name"
          value={data.fname}
          onChange={handleChange}
        />
        <input
          className="mt-2"
          name="lname"
          placeholder="Last Name"
          value={data.lname}
          onChange={handleChange}
        />
        <input
          className="mt-2"
          name="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
        />
        <input
          className="mt-2"
          name="phone"
          placeholder="Contact Number"
          value={data.phone}
          onChange={handleChange}
        />
        <input
          type="submit"
          value={props.currentId === "" ? "Save" : "Update"}
          className="btn btn-primary mt-2"
        />
      </form>
    </>
  );
};

export default Interface;
