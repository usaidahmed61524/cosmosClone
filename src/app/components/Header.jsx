// "use client"
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import signInWithDomainAndTokenId from "mmit-domain-authentication/sdk/domain-checker-sdk";

const Header = () => {
  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [loginBtnVisible, setLoginBtnVisible] = useState(true);

  const handleClose = () => setShow(false);

  // Initialize the SDK
  const userDomain = new signInWithDomainAndTokenId("http://localhost:3000");

  // Use the SDK methods

  const onSubmit = async () => {
    if (!domain || !tokenId) {
      alert("Please fill all the fields!");
      // setLoading(false);

      return;
    } else {
      const regex = /\.mmit$/;
      if (!regex.test(domain)) {
        // setLoading(false);
        setInputError("Please enter a valid .mmit domain address.");
        return;
      } else {
        setLoading(true);
        // let login;
        try {
          const result = await userDomain.checkDomainExistence(domain, tokenId);
          console.log(result.validate.username);
          setUserName(result.validate.username);
          setLoginBtnVisible(false);
        } catch (error) {
          alert("Credentials are not valid");
        }
      }
    }

    setShow(false);
    setLoading(false);
  };

  const handleShow = () => setShow(true);

  const logOutUser = () => {
    setLoginBtnVisible(true);
    setDomain("");
    setTokenId("");
  };

  return (
    <div className="HeaderContainer">
      <div className="mainContentForHeader">
        <div className="textContainer">
          <b className="font-set">Game of NFTs </b>
          <span className="font-set"> is now </span>
          <b className="font-set"> Live! </b>
          {loginBtnVisible ? (
            <Button
              className="btn btn-secondary mx-2 btn-sm"
              onClick={handleShow}
            >
              Login With MMIT Domain
            </Button>
          ) : (
            <>
              <span className="text-light">{userName}</span>
              <Button
                className="btn btn-secondary mx-2 btn-sm"
                onClick={logOutUser}
              >
                LogOut
              </Button>
            </>
          )}

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
