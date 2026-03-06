"use client"
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ChildStateComponent from "./ChildStateComponent";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";
export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
    return (
      <Provider store={store}>
        <div id="wd-passing-functions">
          <h2>Lab 4</h2>
          <ClickEvent />
          <PassingDataOnEvent />
          <Counter />
          <BooleanStateVariables />
          <StringStateVariables />
          <DateStateVariable />
          <ObjectStateVariable />
          <ArrayStateVariable />
          <ParentStateComponent />
          <PassingFunctions theFunction={sayHello} />
          <Link href="./lab4/redux">Redux Examples</Link>
          <hr />
          <Link href="./lab4/react-context">React Context Examples</Link>
          <Link href="./lab4/zustand">Zustand Examples</Link>
        </div>
      </Provider>
    );}