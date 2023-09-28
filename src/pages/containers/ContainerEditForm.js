import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ContainerEditForm.module.css";
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
      history.push(`/container/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content} ${styles.Container}`}>
        {/* Add form fields for container editing */}
        <Form.Group>
  <Form.Check
    type="checkbox"
    label="Public"
    name="is_public"
    checked={is_public}
    onChange={(e) =>
      setContainerData({
        ...containerData,
        is_public: e.target.checked,
      })
    }
  />
  </Form.Group>
    <Form.Group>
    <Form.Label>Container Name</Form.Label>
    <Form.Control
        type="text"
        name="container_name"
        value={container_name}
        onChange={handleChange}
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
    />
    </Form.Group>
    {errors?.container_info?.map((message, idx) => (
    <Alert variant="warning" key={idx}>
        {message}
    </Alert>
    ))}

        {/* Add other form fields for container editing here */}

        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
          Save
        </Button>
      </Container>
    </Form>
  );
}

export default ContainerEditForm;