import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
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


const sortingOptions = [
  { field: "age", label: "Sort by Age (Ascending)" },
  { field: "-age", label: "Sort by Age (Descending)" },
  { field: "location", label: "Sort by Location (Ascending)" },
  { field: "-location", label: "Sort by Location (Descending)" },
  { field: "posts_count", label: "Sort by Knowledge Count (Ascending)" },
  { field: "-posts_count", label: "Sort by Knowledge Count (Descending)" },
  { field: "containers_count", label: "Sort by Containers Count (Ascending)" },
  { field: "-containers_count", label: "Sort by Containers Count (Descending)" },
  { field: "followers_count", label: "Sort by Followers Count (Ascending)" },
  { field: "-followers_count", label: "Sort by Followers Count (Descending)" },
  { field: "created_at", label: "Sort by Date Joined (Ascending)" },
  { field: "-created_at", label: "Sort by Date Joined (Descending)" },
];

const PopularProfiles = ({ message, filter = "", mobile }) => {
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();
  const [profiles, SetProfiles] = useState({ results: [] });
  const [query, setQuery] = useState("");
  const [ordering, setOrdering] = useState(""); 
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showSortingOptions, setShowSortingOptions] = useState(false);
  

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
        mobile && "d-lg-none mb-3"
      }`}
    >
      <div>
        {/* Search bar for profiles */}
      <div className="p-0">
        <Row>
          <Col xs={1} lg={1}>
          <i
            className={`fas fa-sort ${styles.SortIcon}`}
            onClick={() => setShowSortingOptions(!showSortingOptions)} // Toggle dropdown visibility
          />
          </Col>
          <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} xs={9} sm={4} lg={10}>
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)} // Handle search input change
                type="text"
                // className="mr-sm-2"
                placeholder="Search profiles..."
              />
            </Form>
          </Col>
        </Row>
      </div>
      {/* End of search bar */}
      {/* Sorting options */}
      <div className="mt-3">
        <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} lg={8}>
          {/* Dropdown for sorting options */}
          {showSortingOptions && (
            <ListGroup className={styles.SortingDropdown}>
              {sortingOptions.map((option) => (
                <ListGroup.Item
                  key={option.field}
                  className={ordering === option.field ? styles.ActiveSortOption : styles.SortOption}
                  onClick={() => {
                    setOrdering(ordering === option.field ? `-${option.field}` : option.field); // Toggle sorting order
                    setShowSortingOptions(false); // Close dropdown
                  }}
                >
                  <i className={`fas fa-sort-${ordering === option.field ? 'down' : 'up'}`} />
                  {option.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {/* End of dropdown */}
        </Col>
      </div>
      {/* End of sorting options */}
      </div>
      
      {hasLoaded ? (
        <>
          {profiles.results.length ? (
            <>
              <h5>Public Users</h5>
              {mobile ? (
                <div className="d-flex justify-content-around">
                  {profiles.results.slice(0, 4).map((profile) => (
                    <Profile key={profile.id} profile={profile} mobile />
                  ))}
                </div>
              ) : (
                profiles.results.map((profile) => (
                  <div key={profile.id} className={styles.ProfileContainer}>
                    <Profile profile={profile} mobile showButtons={false} />
                    <div className={styles.ProfileInfo}>
                      <p>Age: {profile.age}</p>
                      {profile?.location !== null && profile?.location !== undefined && profile?.location !== "null" && (
                        <div>
                          <p>Location: {profile.location}</p>
                        </div>
                      )}
                      <p>Posts Count: {profile.posts_count}</p>
                      <p>Containers Count: {profile.containers_count}</p>
                      <p>Followers Count: {profile.followers_count}</p>
                      <p>Created At: {profile.created_at}</p>
                    </div>
                  </div>
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
      
    </Container>
  );
}

export default PopularProfiles;