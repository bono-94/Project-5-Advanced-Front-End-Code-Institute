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

import styles from "../../styles/ContainerCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function ContainerCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [containerData, setContainerData] = useState({
    container_name: "",
    container_info: "",
    is_public: false,
  });
  const { container_name, container_info, is_public } = containerData;

  // const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setContainerData({
      ...containerData,
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

    formData.append("container_name", container_name);
    formData.append("container_info", container_info);
    formData.append("is_public", is_public);
    // formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/containers/", formData);
      history.push(`/containers/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const allFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Public"
          name="is_public"
          checked={containerData.content}
          onChange={(e) => setContainerData({ ...containerData, is_public: e.target.checked })}
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
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
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

export default ContainerCreateForm;