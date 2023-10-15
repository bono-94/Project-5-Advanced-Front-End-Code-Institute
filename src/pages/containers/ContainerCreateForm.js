import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";


import styles from "../../styles/ContainerCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function ContainerCreateForm() {
  window.scrollTo(0, 0);
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [containerData, setContainerData] = useState({
    container_name: "",
    container_info: "",
    is_public: false,
  });
  const { container_name, container_info, is_public } = containerData;

  const history = useHistory();

  const handleChange = (event) => {
    setContainerData({
      ...containerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("container_name", container_name);
    formData.append("container_info", container_info);
    formData.append("is_public", is_public);

    try {
      const { data } = await axiosReq.post("/containers/", formData);
      history.push(history.push("/", { successMessage: "Successfully created a new container!" }));
      window.scrollTo(0, 0);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const allFields = (
    <div className="text-center">
      <Form.Group>
      <Form.Label>Public Visibility</Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
          name="is_public"
          checked={containerData.is_public}
          onChange={(e) => setContainerData({ ...containerData, is_public: e.target.checked })}
          className={styles.Checkbox}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Container Name</Form.Label>
        <Form.Control
          type="text"
          name="container_name"
          value={container_name}
          onChange={handleChange}
          className={styles.Input}
          placeholder="Name your container..."
        />
      </Form.Group>
      {errors?.container_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Container Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="container_info"
          value={container_info}
          onChange={handleChange}
          className={styles.Input}
          placeholder="Tell us more about the container..."
        />
      </Form.Group>
      {errors?.container_info?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <Row className={styles.Row}>
      <Col className={` py-2 p-md-2 ${styles.SupportCol}`}>
        <Container  className={`${appStyles.Content} p-4 ${styles.Container}`}>
        <h1 className={styles.Header}>Create Container</h1>
          <Form onSubmit={handleSubmit}>
            {allFields}
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default ContainerCreateForm;
