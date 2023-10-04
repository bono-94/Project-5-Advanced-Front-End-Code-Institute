import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import Select from "react-dropdown-select";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [selectedContainers, setSelectedContainers] = useState([]);
  const [availableContainers, setAvailableContainers] = useState([]);
  const [imageSaved, setImageSaved] = useState(false);

  const [postData, setPostData] = useState({
    containers: [],
    post_category: "announcement",
    image: "",
    title: "",
    sub_title: "",
    topic: "",
    location: "",
    content: "",
    inspiration: "",
    source: "",
  });
  const { 
    containers,
    post_category,
    image,
    title,
    sub_title,
    topic,
    location,
    content,
    inspiration,
    source,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  useEffect(() => {

    axiosReq.get("/containers/") 
      .then((response) => {
        console.log("Response data:", response.data); 
        setAvailableContainers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available containers:", error);
      });
  }, []); 

  console.log("availableContainers:", availableContainers);

  const handleChange = (event) => {

    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeContainers = (event) => {

    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    
    console.log("Selected Containers:", selectedOptions);

    setPostData({
      ...postData,
      containers: selectedOptions,
    });

    setSelectedContainers(selectedOptions);
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const selectedContainerIds = selectedContainers.map((id) => parseInt(id, 10));
  
    const requestData = {
      containers: selectedContainerIds,
      post_category,
      title,
      sub_title,
      topic,
      location,
      content,
      inspiration,
      source,
    };
  
    try {
      const { data } = await axiosReq.post("/posts/", requestData);
      history.push("/", { successMessage: "Successfully created a new post! You can now add a picture." });
      window.scrollTo(0, 0);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleSubmitImage = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", imageInput?.current?.files[0]);
  
    try {
      // Update the image directly without navigating
      await axiosReq.patch(`/post/${id}/`, formData); // Use PATCH instead of PUT
      // Update the image state to reflect changes
      setPostData({
        ...postData,
        image: URL.createObjectURL(imageInput?.current?.files[0]),
      });
      setImageSaved(true);
      // Redirect or show a success message if needed
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const allFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Select a Category</Form.Label>
        <Form.Control
          as="select"
          name="post_category"
          value={post_category}
          onChange={handleChange}
        >
          <option value="announcement">Announcement</option>
          <option value="answer">Answer</option>
          <option value="blog">Blog</option>
          <option value="event">Event</option>
          <option value="idea">Idea</option>
          <option value="interview">Interview</option>
          <option value="journal">Journal</option>
          <option value="news">News</option>
          <option value="review">Review</option>
          <option value="story">Story</option>
          <option value="tutorial">Tutorial</option>
          <option value="question">Question</option>
        </Form.Control>
      </Form.Group>
        
      <Form.Group>
        <Form.Label>Select Containers</Form.Label>
        <Select
          name="containers"
          multi
          options={availableContainers.results || []}
          values={containers}
          labelField="container_name"
          valueField="id"
          onChange={(values) => setSelectedContainers(values.map((v) => v.id))}
        />
      </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
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
          <Form.Label>Sub-title</Form.Label>
          <Form.Control
            type="text"
            name="sub_title"
            value={sub_title}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.sub_title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Group>
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            name="topic"
            value={topic}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.topic?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.location?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={content}
            onChange={handleChange}
            rows={8}
          />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Inspiration</Form.Label>
          <Form.Control
            as="textarea"
            name="inspiration"
            value={inspiration}
            onChange={handleChange}
            rows={4}
          />
        </Form.Group>
        {errors?.inspiration?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Source</Form.Label>
          <Form.Control
            as="textarea"
            name="source"
            value={source}
            onChange={handleChange}
            rows={4}
          />
        </Form.Group>
        {errors?.source?.map((message, idx) => (
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
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    <Row>
      <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
        <Container
          className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
        >
          
           
        </Container>
      </Col>
      <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
        <Container className={appStyles.Content}>{allFields}</Container>
      </Col>
    </Row>
    </Form>
  );
            }

export default PostCreateForm;
