import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import AccountPage from "./AccountPage/AccountPage";
import ContentWrapper from './ContentWrapper/ContentWrapper';
import GeneralLanding from './GeneralLanding/GeneralLanding';
import ContactsPage from './ContactsPage/ContactsPage';
import PromotionPage from './PromotionPage/PromotionPage';
import ShopPage from './ShopPage/ShopPage';
import Cart from "./Cart/Cart";
import AdminPage from './Admin/AdminPage/AdminPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <ContentWrapper>
            <Route exact path="/" component={GeneralLanding} />
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/promotion" component={PromotionPage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/account" component={AccountPage} />
            {/*only for admin*/}
            <Route path="/admin" component={AdminPage} />
          </ContentWrapper>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
