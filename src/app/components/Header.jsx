// "use client"
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useAuth } from "../Authentication";

import { loginwithDomain } from "../function";

const Header = () => {
  const auth = useAuth();

  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [userData, setUserData] = useState();
  const [inputError, setInputError] = useState("");

  const handleClose = () => setShow(false);
  const onSubmit = async () => {
    // setShow(false);
    if (!domain || !tokenId) {
      alert("please fill this fields");
      return;
    } else {
      const regex = /\.mmit$/;
      if (!regex.test(domain)) {
        // console.log("error");
        setInputError("Please enter a valid .mmit domain address.");

        return;
      } else {
        // alert("well done");
        let login;
        try {
          login = await loginwithDomain(domain, tokenId);
          // console.log(login.useObj);
        } catch (error) {
          // console.log(error);
        }

        const user = login.useObj;
        // console.log(user);
        auth.login({
          user,
        });
      }
    }
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <div className="HeaderContainer">
      <div className="mainContentForHeader">
        <div className="textContainer">
          <b className="font-set">Game of NFTs </b>
          <span className="font-set"> is now </span>
          <b className="font-set"> Live! </b>

          <Button
            className="btn btn-secondary mx-2 btn-sm"
            onClick={handleShow}
          >
            Login With MMIT Domain
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Insert Your MMIT Domain</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Domain"
                    onChange={(e) => {
                      setDomain(e.target.value);
                      setInputError("");
                    }}
                  />
                  <p className="text-danger">{inputError}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="number"
                    placeholder="Token Id"
                    onChange={(e) => {
                      setTokenId(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="light" onClick={onSubmit}>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
