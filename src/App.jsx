import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Footer from "./Share/Footer/Footer";
import Header from "./Share/Header/Header";
import Home from "./Home/Home";
import Detail from "./Detail/Detail";
import Cart from "./Cart/Cart";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Checkout from "./Checkout/Checkout";
import History from "./History/History";
import Shop from "./Shop/Shop";
// import Chat from "./Share/Chat/Chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />{" "}
          <Route path="/detail/:id" component={Detail} />{" "}
          <Route path="/cart" component={Cart} />{" "}
          <Route path="/signin" component={SignIn} />{" "}
          <Route path="/signup" component={SignUp} />{" "}
          <Route path="/checkout" component={Checkout} />{" "}
          <Route path="/history" component={History} />{" "}
          <Route path="/shop" component={Shop} />
        </Switch>{" "}
      </BrowserRouter>

      {/* <Chat /> */}

      <Footer />
    </div>
  );
}

export default App;
