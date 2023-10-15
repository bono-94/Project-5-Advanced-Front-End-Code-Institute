import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ContainerCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function ContainerEditForm() {
  const [errors, setErrors] = useState({});
  const [containerData, setContainerData] = useState({
    container_name: "",
  container_info: "",
  is_public: false,
  });

  const {
    container_name,
    container_info,
    is_public,
    // Add other missing fields here
  } = containerData;

  const history = useHistory();
  const { id } = useParams();

  window.scrollTo(0, 0);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/container/${id}/`);
        const { container_name, container_info, is_public, is_owner } = data;

        is_owner
          ? setContainerData({
              container_name,
              container_info,
              is_public
            })
          : history.push("/");
      } catch (err) {
        // Handle errors
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setContainerData({
      ...containerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append container fields to formData
    formData.append("is_public", is_public);
    formData.append("container_name", container_name);
    formData.append("container_info", container_info);
    // Add other container fields here

    try {
      await axiosReq.put(`/container/${id}/`, formData);
      history.push(history.push("/", { successMessage: "Successfully edited your container!" }));
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
        <h1 className={styles.Header}>Edit Container</h1>
          <Form onSubmit={handleSubmit}>
            {allFields}
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default ContainerEditForm;