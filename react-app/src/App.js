import Button from "react-bootstrap/Button";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FunctionalGreetingWithProps from './components/FunctionalGreetingWithProps';
import NavbarStateful from "./components/NavbarStateful";
import Sidebar from './components/Sidebar';
import StatefulGreetingTwo from './components/StatefulGreetingTwo';
import EventsClass from './components/EventsClass';
import EventsFunctional from './components/EventsFunctional';
import EventsBinding from './components/EventsBinding';
import ConditionalRenderingClass from './components/ConditionalRenderingClass';
import ConditionalRenderingFunctional from './components/ConditionalRenderingFunctional';
import NestingComponents from './components/NestingComponents';
import MethodAsPropsChildFunctionalComponent from './components/MethodAsPropsChildFunctionalComponent';
import MethodAsPropsParentClassComponent from './components/MethodAsPropsParentClassComponent';
import NavBarForm from './components/NavBarForm';
import RenderingLists from './components/RenderingLists';
import Content from "./components/Content";
import LifeCyclesCWU from "./components/LifeCyclesCWU";
import LifeCyclesCDM from "./components/LifeCyclesCDM";
import LifeCyclesCDU from "./components/LifeCyclesCDU";
import ControlledForm from "./components/ControlledForm";
import SearchBar from "./components/SearchBar";
import HooksCounter from "./components/HooksCounter";
import ClassCounter from "./components/ClassCounter";
import ControlledFormHooks from "./components/ControlledFormHooks";
import UseStateWithArrays from "./components/UseStateWithArrays";
import StatefulGreetingWithPrevState from "./components/StatefulGreetingWithPrevState";
import UseStateWithObjects from "./components/UseStateWithObjects";
import UseEffectCounter from "./components/UseEffectCounter";
import UseEffectCounterContainer from "./components/UseEffectCounter";
import ContentHooks from "./components/ContentHooks";
import HTTPRequests from "./components/HTTPRequests";
import HTTPPost from "./components/HTTPPost";
import HTTPHooks from "./components/HTTPHooks";
import ContentAPI from "./components/ContentAPI";
import ContentAPIHooks from "./components/ContentAPIHooks";


function App() {

  return (
    <div className="App">
      <Button variant="primary">Primary</Button>
      <Button variant="dark">Primary</Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn how to use React
        </a>
        <FunctionalGreetingWithProps greeting="Nice to meet you!" name="Mike" age="32"/>
        
      </header>
      
      <ContentAPIHooks />
      <ContentAPI />
      <HTTPHooks />
      <HTTPPost />
      <HTTPRequests />
      <ContentHooks />
      <UseEffectCounterContainer />
      <UseEffectCounter />
      <ClassCounter />
      <StatefulGreetingWithPrevState />
      <HooksCounter />
      <UseStateWithObjects />
      <UseStateWithArrays />
      <ControlledFormHooks />
      <HooksCounter />
      <ClassCounter />
      <SearchBar />
      <ControlledForm />
      <NavBarForm />
      <Sidebar />
      <Content />
      <StatefulGreetingTwo greeting="I'm a stateful class component"/>
      <NavbarStateful />
      <EventsClass />
      <EventsFunctional />
      <EventsBinding />
      <ConditionalRenderingClass />
      <ConditionalRenderingFunctional connected={true} />
      <NestingComponents />
      <MethodAsPropsChildFunctionalComponent />
      <MethodAsPropsParentClassComponent />
      <RenderingLists />
      <LifeCyclesCDM />
      <LifeCyclesCWU />
      <LifeCyclesCDU />
      <Content />

    </div>
  );
}

export default App;
