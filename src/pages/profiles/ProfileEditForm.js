import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/ProfileEditForm.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";


const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const [imageSaved, setImageSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    image: "",
    profile_quote: "",
    first_name: "",
    location: "",
    age: "",
    bio: "",
    website: "",    
  });
  const { 
    image,
    profile_quote,
    first_name,
    location,
    age,
    bio,
    website, } = profileData;

  const imageInput = useRef(null);

  window.scrollTo(0, 0);

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profile/${id}/`);
          const { profile_quote, first_name, location, age, bio, website, image } = data;
          setProfileData({ profile_quote, first_name, location, age, bio, website, image });
          setIsLoading(false);
        } catch (err) {
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  if (isLoading) {
    return (
      <Row className="h-100">
        <Col className="py-2 p-0">
          <Asset spinner />
        </Col>
      </Row>
    );
  }


  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("profile_quote", profile_quote);
    formData.append("first_name", first_name);
    formData.append("location", location);
    formData.append("age", age);
    formData.append("bio", bio);
    formData.append("website", website);
    
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profile/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.push("/", { successMessage: "Successfully updated your profile!" });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      {/* <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={profile_quote}
          onChange={handleChange}
          name="content"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))} */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
      <Row className={styles.Row}>
        <Col className={` py-2 p-md-2 ${styles.SupportCol}`}>
          <Container  className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
            <h1 className={styles.Header}>Edit Profile</h1>
            <Form onSubmit={handleSubmit} className="text-center" encType="multipart/form-data">
              <Form.Group className="text-center">
                {image && (
                  <figure>
                    <Image src={image} fluid />
                  </figure>
                )}
                {errors?.image?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <div>
                  <div className={styles.Upload}>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn text-dark bg-warning border-1 border-dark text-center`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                  <Form.File
                    id="image-upload"
                    ref={imageFile}
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setProfileData({
                          ...profileData,
                          image: URL.createObjectURL(e.target.files[0]),
                        });
                      }
                    }}
                />
              </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Profile Quote</Form.Label>
                <Form.Control
                  type="text"
                  value={profile_quote}
                  onChange={handleChange}
                  name="profile_quote"
                  className={styles.Input}
                  placeholder="Enter your life qoute here..."
                />
                {errors?.profile_quote?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={first_name}
                  onChange={handleChange}
                  name="first_name"
                  className={styles.Input}
                  placeholder="Your first name..."
                />
                {errors?.first_name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={handleChange}
                  name="location"
                  className={styles.Input}
                  placeholder="Where are you from?"
                />
                {errors?.location?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  value={age}
                  onChange={handleChange}
                  name="age"
                  className={styles.Input}
                  placeholder="How old are you?"
                />
                {errors?.age?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  value={bio}
                  onChange={handleChange}
                  name="bio"
                  rows={7}
                  className={styles.Input}
                  placeholder="Tell the world more about yourself..."
                />
                {errors?.bio?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  value={website}
                  onChange={handleChange}
                  name="website"
                  className={styles.Input}
                  placeholder="You can share one social media link or website..."
                />
                {errors?.website?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
              <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                save
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
  );
};

export default ProfileEditForm;
