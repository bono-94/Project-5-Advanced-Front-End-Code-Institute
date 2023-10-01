import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";

const PopularProfiles = ({ message, filter = "", mobile }) => {
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();
  const [profiles, SetProfiles] = useState({ results: [] });
  const [query, setQuery] = useState("");
  const [ordering, setOrdering] = useState(""); 
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/?${filter}search=${query}&ordering=${ordering}`);
        console.log('API Response:', data);
        SetProfiles(data);
        setHasLoaded(true);
        
      } catch (err) {
        // Handle errors if necessary
        console.error(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchContainers();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, ordering, pathname, currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      
      {hasLoaded ? (
        <>
          {profiles.results.length ? (
            <>
              <h5>Popular Users</h5>
              {mobile ? (
                <div className="d-flex justify-content-around">
                  {profiles.results.slice(0, 4).map((profile) => (
                    <Profile key={profile.id} profile={profile} mobile />
                  ))}
                </div>
              ) : (
                profiles.results.map((profile) => (
                  <Profile key={profile.id} profile={profile} />
                ))
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message="No results found. Adjust the search keyword." />
            </Container>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
      {/* Search bar for profiles */}
      <div className="mt-3">
        <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} lg={8}>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)} // Handle search input change
              type="text"
              className="mr-sm-2"
              placeholder="Search profiles..."
            />
          </Form>
        </Col>
      </div>
      {/* End of search bar */}
      {/* Sorting options */}
      <div className="mt-3">
        <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} lg={8}>
          <i className={`fas fa-sort ${styles.SortIcon}`} />
          <button
            className={ordering === "age" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("age")}
          >
            Sort by Age
          </button>
          <button
            className={ordering === "first_name" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("first_name")}
          >
            Sort by First Name
          </button>
          <button
            className={ordering === "location" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("location")}
          >
            Sort by Location
          </button>
          <button
            className={ordering === "posts_count" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("posts_count")}
          >
            Sort by Posts Count
          </button>
          <button
            className={ordering === "followers_count" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("followers_count")}
          >
            Sort by Followers Count
          </button>
          <button
            className={ordering === "following_count" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("following_count")}
          >
            Sort by Following Count
          </button>
          <button
            className={ordering === "containers_count" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("containers_count")}
          >
            Sort by Containers Count
          </button>
          <button
            className={ordering === "owner__following__created_at" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("owner__following__created_at")}
          >
            Sort by Following Created At
          </button>
          <button
            className={ordering === "owner__followed__created_at" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("owner__followed__created_at")}
          >
            Sort by Followed Created At
          </button>
          <button
            className={ordering === "created_at" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("created_at")}
          >
            Sort by Created At
          </button>
          <button
            className={ordering === "updated_at" ? styles.ActiveSortButton : styles.SortButton}
            onClick={() => setOrdering("updated_at")}
          >
            Sort by Updated At
          </button>
        </Col>
      </div>
      {/* End of sorting options */}
    </Container>
  );
}

export default PopularProfiles;