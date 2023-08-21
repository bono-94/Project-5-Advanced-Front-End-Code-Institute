import logo from './logo.svg';
import './App.css';
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


function App() {

  return (
    <div className="App">
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
        <Sidebar />
      </header>
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
      <NavBarForm />
      <RenderingLists />
      <Content />
    </div>
  );
}

export default App;
