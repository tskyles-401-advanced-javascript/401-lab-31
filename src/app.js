import React from "react";
import Footer from './components/footer/footer';
import Header from './components/header/header';
// State Only
import ToDo from "./components/todo/todo.js";

// API Connected (Live Data)

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ToDo />
        <Footer />
      </>
    );
  }
}
