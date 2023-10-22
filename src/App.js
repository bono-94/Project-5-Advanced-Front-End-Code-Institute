import "./api/axiosDefaults";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import Home from "./pages/home/Home";
import Containers from "./pages/containers/Containers";
import ContainerCreateForm from "./pages/containers/ContainerCreateForm";
import ContainerPage from "./pages/containers/ContainerPage";
import ContainerEditForm from "./pages/containers/ContainerEditForm";
import ContainersPublic from "./pages/containers/ContainersPublic";
import ContainersPrivate from "./pages/containers/ContainersPrivate";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostEditForm from "./pages/posts/PostEditForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Support from "./pages/support/Support";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import PopularProfiles from "./pages/profiles/PopularProfiles";
import styles from "./App.module.css";


function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main} fluid>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/knowledge/live"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/knowledge/followed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/knowledge/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/knowledge/favourited"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or favourite a post."
                filter={`favourites__owner__profile=${profile_id}&ordering=-favourites__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/container/create" render={() => <ContainerCreateForm />} />
          <Route exact path="/containers" render={() => <Containers />} />
          <Route exact path="/containers/public" render={() => <ContainersPublic message="No results found. Adjust the search keyword." />} />
          <Route exact path="/containers/private" render={() => <ContainersPrivate message="No results found. Adjust the search keyword." />} />
          <Route exact path="/container/:id" render={() => <ContainerPage message="No results found. Adjust the search keyword." />} />
          <Route exact path="/container/:id/edit" render={() => <ContainerEditForm />} />
          <Route exact path="/knowledge/create" render={() => <PostCreateForm />} />
          <Route exact path="/knowledge/live" render={() => <PostsPage />} />
          <Route exact path="/knowledge/:id" render={() => <PostPage />} />
          <Route exact path="/knowledge/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles" render={() => <PopularProfiles />} />
          <Route exact path="/profile/:id" render={() => <ProfilePage />} />
          <Route exact path="/profile/:id/edit" render={() => <ProfileEditForm />} />
          <Route
            exact
            path="/profile/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profile/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route exact path="/support" render={() => <Support />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
