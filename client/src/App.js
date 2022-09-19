import React, { Component } from "react";
import SupplyChainContract from "./contracts/SupplyChain.json";
import { Router, Switch, Route } from "react-router-dom";
import { RoleContextProvider } from "./context/RoleContext";
// import history from "./history";
import { createBrowserHistory } from 'history';
import getWeb3 from "./getWeb3";

import Manufacture from "./admins/ManufacturerPage/Manufacture";
import ManufactureLists from "./admins/ManufacturerPage/ManufactureLists";
import ShipManufacture from "./admins/ManufacturerPage/ShipManufacture";

import "./App.css";
import ReceiveThirdParty from "./admins/ThirdPartyPage/ReceiveThirdParty";
import CustomerPurchase from "./admins/CustomerPage/CustomerPurchase";
import ShipThirdParty from "./admins/ThirdPartyPage/ShipThirdParty";
import DeliveryReceive from "./admins/DeliveryPage/DeliveryReceive";
import DeliveryShip from "./admins/DeliveryPage/DeliveryShip";
import CustomerReceive from "./admins/CustomerPage/CustomerReceive";
import ReceivedByCustomer from "./admins/CustomerPage/CustomerOwn";
import ThirdPartyPurchase from "./admins/ThirdPartyPage/ThirdPartyPurchase";
import AdminRoles from "./admins/AdminRoles";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/Theme";

import Find from './admins/Find';
import Index from "./admins/Index";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, mRole: null, tpRole: null, dRole: null, cRole: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const mRole = localStorage.getItem("mRole");
      const tpRole = localStorage.getItem("tpRole");
      const dRole = localStorage.getItem("dRole");
      const cRole = localStorage.getItem("cRole");

      this.setState({ web3, accounts, contract: instance, mRole: mRole, tpRole: tpRole, dRole: dRole, cRole: cRole }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;
    console.log(contract);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <RoleContextProvider mRole={this.state.mRole} tpRole={this.state.tpRole} dRole={this.state.dRole} cRole={this.state.cRole}>
            <Router history={createBrowserHistory()}>
              <Switch>

                <Route exact path="/adminRoles">
                  <AdminRoles accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                </Route>
                <Route exact path="/find">
                  <Find accounts={this.state.accounts} supplyChainContract={this.state.contract} web3={this.state.web3} />
                </Route>
                <Route exact path="/">
                  <Index accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                </Route>


                <Route exact path="/manufacturer/manufacture">
                  {this.state.mRole !== "" ?
                    <Manufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Manufacturer Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/manufacturer/manufactureLists">
                  {this.state.mRole !== "" ?
                    <ManufactureLists accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Manufacturer Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/manufacturer/ship">
                  {this.state.mRole !== "" ?
                    <ShipManufacture accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Manufacturer Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/ThirdParty/allProducts">
                  {this.state.tpRole !== "" ?
                    <ThirdPartyPurchase accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Third Party Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/ThirdParty/receive">
                  {this.state.tpRole !== "" ?
                    <ReceiveThirdParty accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Third Party Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/Customer/buy">
                  {this.state.cRole !== "" ?
                    <CustomerPurchase accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Customer Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/ThirdParty/ship">
                  {this.state.tpRole !== "" ?
                    <ShipThirdParty accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Third Party Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/Delivery/receive">
                  {this.state.dRole !== "" ?
                    <DeliveryReceive accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Delivery Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/Delivery/ship">
                  {this.state.dRole !== "" ?
                    <DeliveryShip accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Delivery Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/Customer/receive">
                  {this.state.cRole !== "" ?
                    <CustomerReceive accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Customer Role at /AdminRoles</h1>}
                </Route>
                <Route exact path="/Customer/allReceived">
                  {this.state.cRole !== "" ?
                    <ReceivedByCustomer accounts={this.state.accounts} supplyChainContract={this.state.contract} />
                    : <h1>Assign Customer Role at /AdminRoles</h1>}
                </Route>

              </Switch>
            </Router>
          </RoleContextProvider>

        </ThemeProvider>
      </div>
    );
  }
}

export default App;
