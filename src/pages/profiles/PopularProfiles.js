import React, { useEffect, useState } from "react";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import Profile from "./Profile";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css";


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
        SetProfiles(data);
        setHasLoaded(true);

      } catch (err) {
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
      className={`${appStyles.Content} ${styles.LoadFadeIn} ${
        mobile && "d-lg-none mb-0 p-3"
      }`}
    > 
      <div className={`mt-3 ${styles.SearchBarContainer}`}>
        <Row fluid className={styles.SortRow}>
          <h4>Public Profiles</h4>
          <i
            className={`fas fa-sort mt-0 ${styles.SortIcon}`}
            onClick={() => setShowSortingOptions(!showSortingOptions)}
          />
        </Row>
        <Row className={styles.SearchRow} fluid>
          <Col className="p-0">
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                placeholder="Search users..."
              />
            </Form>
          </Col>
        </Row>
      </div>
      <div className="mt-1">
        <Col className={` ${styles.ContainerList}`}>
          {showSortingOptions && (
            <ListGroup className={styles.SortingDropdown}>
              {sortingOptions.map((option) => (
                <ListGroup.Item
                  key={option.field}
                  className={ordering === option.field ? styles.ActiveSortOption : styles.SortOption}
                  onClick={() => {
                    setOrdering(ordering === option.field ? `-${option.field}` : option.field);
                    setShowSortingOptions(false);
                  }}
                >
                  <i className={`pb-1 fas fa-sort-${ordering === option.field ? 'down' : 'up'}`} />
                  {option.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </div>
      {hasLoaded ? (
      <>
        {profiles.results.length ? (
          <>
            {mobile ? (
              <div className={`d-flex justify-content-around ${styles.LoadFadeIn}`}>
                {profiles.results.slice(0, 3).map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
              </div>
            ) : (
              profiles.results.map((profile) => (
                <div key={profile.id} className={styles.ProfileContainer}>
                  <Profile profile={profile} mobile showButtons={false} />
                  <div className={styles.ProfileInfo}>
                    <div className={`hide-on-desktop`}>
                      {profile?.location !== null &&
                      profile?.location !== undefined &&
                      profile?.location !== "null" ? (
                        <p><strong>Location:</strong> {profile.location}</p>
                      ) : (
                        <p><strong>Location:</strong> Unknown</p>
                      )}
                      {profile?.age !== null && profile?.age !== undefined && profile?.age !== "null" ? (
                        <p><strong>Age:</strong> {profile.age}</p>
                      ) : (
                        <p><strong>Age:</strong> Unknown</p>
                      )}
                    </div>
                    <p><strong>Knowl3dg3:</strong> {profile.posts_count}</p>
                    <p><strong>Containers:</strong> {profile.containers_count}</p>
                    <p><strong>Followers:</strong> {profile.followers_count}</p>
                    <p><strong>Joined:</strong> {profile.created_at}</p>
                  </div>
                  <hr></hr>
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