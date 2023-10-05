import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Select from "react-dropdown-select";

import Asset from "../../components/Asset";


function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [availableContainers, setAvailableContainers] = useState([]);
  const [selectedContainers, setSelectedContainers] = useState([]); 
  const [imageSaved, setImageSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [postData, setPostData] = useState({
    containers: [],
    post_category: "",
    title: "",
    sub_title: "",
    topic: "",
    location: "",
    content: "",
    inspiration: "",
    source: "",
    image: "",
  });
  const { 
    containers,
    post_category,
    title,
    sub_title,
    topic,
    location,
    content,
    inspiration,
    source,
    image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/post/${id}/`);
        const { 
          containers: selectedContainerIds,
          post_category,
          title,
          sub_title,
          topic,
          location,
          content,
          inspiration,
          source,
          image,
          is_owner
        } = data;
        

        is_owner ? setPostData({ 
          containers: selectedContainerIds,
          post_category,
          title,
          sub_title,
          topic,
          location,
          content,
          inspiration,
          source,
          image }) : history.push("/");
          
        setSelectedContainers(selectedContainerIds); // Set selected containers
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
  

    handleMount();
  }, [history, id]);

  useEffect(() => {
    // Fetch available containers from your backend and update the state
    axiosReq
    .get("/containers/") // Adjust the URL based on your API endpoint
      .then((response) => {
        console.log("Response data:", response.data); // Log the data received
        setAvailableContainers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available containers:", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  console.log("availableContainers:", availableContainers);

  if (isLoading) {
    return (
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Asset spinner />
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>
            {/* Show the loading spinner on the right column as well if needed */}
            <Asset spinner />
          </Container>
        </Col>
      </Row>
    );
  }

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
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

  const handleChangeContainers = (selectedOptions) => {
    const selectedContainerIds = selectedOptions.map((option) => option.id);
    const selectedContainerNames = selectedOptions.map((option) => option.container_name); // New line

    console.log("Selected Container IDs:", selectedContainerIds); // Log selected container IDs
    console.log("Selected Container Names:", selectedContainerNames); // Log selected container names

    setPostData({
      ...postData,
      containers: selectedContainerIds, // Store selected container IDs as an array
      container_name: selectedContainerNames,
    });
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
      await axiosReq.put(`/post/${id}/`, requestData);
      history.push("/", { successMessage: "Successfully edited your post!" });
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


  const textFields = (
    <div className="text-center">
      {/* <Form.Group>
        <Form.Label>Select Containers</Form.Label>
        <Form.Control
          as="select"
          name="containers"
          value={containers}
          onChange={handleChangeContainers}
          multiple  // Add the multiple attribute
        >
        {/* Remove the default "Select a Container" option 
        {availableContainers.results && availableContainers.results.map((container) => (
          <option key={container.id} value={container.id}>
            {container.container_name}
          </option>
        ))}
      </Form.Control>
      </Form.Group> */}

      <Form.Group>
        <Form.Label>Select Containers</Form.Label>
        <Select
          name="containers"
          multi
          options={availableContainers.results || []}
          values={containers.map((containerId) => ({
            id: containerId,
          }))}
          labelField="container_name"
          valueField="id"
          onChange={(values) => setSelectedContainers(values.map((v) => v.id))}
          paginatioin
        />
      </Form.Group>
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

        {/* Include the missing fields */}
        <Form.Group>
          <Form.Label>Sub Title</Form.Label>
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
          <Form.Label>Inspiration</Form.Label>
          <Form.Control
            type="text"
            name="inspiration"
            value={inspiration}
            onChange={handleChange}
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
            type="text"
            name="source"
            value={source}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.source?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
  
    
    {/* End of missing fields */}

    <Form.Group>
      <Form.Label>Content</Form.Label>
      <Form.Control
        as="textarea"
        rows={6}
        name="content"
        value={content}
        onChange={handleChange}
      />
    </Form.Group>
    {errors?.content?.map((message, idx) => (
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
      save
    </Button>
  </div>
);

return (
  <Row>
    <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
      <Container
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
      >
        <Form onSubmit={handleSubmitImage} encType="multipart/form-data">
          <Form.Group className="text-center">
            <figure>
              <Image className={appStyles.Image} src={image} rounded />
            </figure>
            <div>
              {imageSaved ? ( // Display different button content based on imageSaved state
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  disabled
                >
                  Saved
                </Button>
              ) : (
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                    htmlFor="image-upload"
                  >
                    Change the image
                  </Form.Label>
                  <Form.File
                    id="image-upload"
                    accept="image/*"
                    type="file"
                    onChange={handleChangeImage}
                    ref={imageInput}
                  />
                </div>
              )}
            </div>
          </Form.Group>
          {errors?.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          {!imageSaved && ( // Show "Save" button only if the image is not saved
            <>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                Save
              </Button>
            </>
          )}
        </Form>
        <div className="d-md-none">{textFields}</div>
      </Container>
    </Col>
    <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
      <Container className={appStyles.Content}>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          {textFields}
        </Form>
      </Container>
    </Col>
  </Row>
);
}

export default PostEditForm;
