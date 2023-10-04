import React, { useState } from "react";
// import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// import Image from "react-bootstrap/Image";

// import Asset from "../../components/Asset";

// import Upload from "../../assets/upload.png";

import styles from "../../styles/Support.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import SupportSubmit from "../../pages/support/SupportSubmit";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function Support() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [supportId, setSupportId] = useState(null);
  

  const [supportData, setSupportData] = useState({
    support_type: "support",
    title: "",
    content: "",
    container_name: "",
    knowledge_name: "",
  });
  const { 
    support_type,
    title,
    content,
    container_name,
    knowledge_name } = supportData;

  // const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setSupportData({
      ...supportData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeImage = (event) => {
  //   if (event.target.files.length) {
  //     URL.revokeObjectURL(image);
  //     setContainerData({
  //       ...containerData,
  //       image: URL.createObjectURL(event.target.files[0]),
  //     });
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("support_type", support_type);
    formData.append("content", content);
    formData.append("title", title);
    formData.append("container_name", container_name);
    formData.append("knowledge_name", knowledge_name);
    // formData.append("is_public", is_public);
    // formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/support/", formData);
      setSuccessMessage(`Successfully sent request! Your request ID is: ${data.id}`);
      history.push("/", { successMessage: "Your support request has been sent! Keep an eye on your email, we will contact you as soon as possible." });
      window.scrollTo(0, 0);
      //   history.push(`/support/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const allFields = (
    <div className="text-center">
      {/* <Form.Group>
        <Form.Check
          type="checkbox"
          label="Public"
          name="is_public"
          checked={supportData.content}
          onChange={(e) => setSupportData({ ...supportData, is_public: e.target.checked })}
        />
      </Form.Group> */}
      <Form.Group>
        <Form.Label>Support Type</Form.Label>
        <Form.Control
          as="select"
          name="support_type"
          value={support_type}
          onChange={handleChange}
          size="sm"
        >
          <option value="consultacy">Consultancy</option>
          <option value="feedback">Feedback</option>
          <option value="request">Request Knowledge</option>
          <option value="support">Support Ticket</option>
          <option value="suggestion">Suggestion</option>
        </Form.Control>
      </Form.Group> 
      <Form.Group>
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Relevant Knowledge</Form.Label>
        <Form.Control
          type="text"
          name="knowledge_name"
          value={knowledge_name}
          onChange={handleChange}
          size="sm"
        />
      </Form.Group>
      {errors?.knowledge_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Relevant Container</Form.Label>
        <Form.Control
          type="text"
          name="container_name"
          value={container_name}
          onChange={handleChange}
          size="sm"
        />
      </Form.Group>
      {errors?.container_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Support} d-flex flex-column justify-content-center`}
          >

          {successMessage && supportId && (
            <SupportSubmit successMessage={successMessage} supportId={supportId} />
          )}
            {/* <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))} */}

            <div className="d-md-none">{allFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{allFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default Support;