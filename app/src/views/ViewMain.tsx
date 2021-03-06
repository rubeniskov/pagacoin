import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Sidebar from '../components/Sidebar';
import LayoutMain from '../layouts/LayoutMain';
import LayoutAside from '../layouts/LayoutAside';
import LayoutAnimated from '../layouts/LayoutAnimated';
import ViewRouting, { ViewRoutingRoute } from './ViewRouting';
import { StickyContainer } from 'react-sticky';

// import Transactions from './Transactions';
import ViewUsers from './ViewUsers';
import ViewUser from './ViewUser';
import ViewWallets from './ViewWallets';
import ViewWallet from './ViewWallet';
import ViewTransactions from './ViewTransactions';
import ViewTransaction from './ViewTransaction';
import ViewHome from './ViewHome';


const ViewMain = () => {
  return (
    <StickyContainer>
      <Router>
        <LayoutMain sidebar={<Sidebar />}>
          <Switch>
            <Route path="/users">
              <ViewRouting maxRoutingViews={2}>
                <ViewRoutingRoute path="/users" layout={LayoutAnimated}>
                  <ViewUsers />
                </ViewRoutingRoute>
                <ViewRoutingRoute path="/users/:userId" layout={LayoutAside}>
                  <ViewUser />
                </ViewRoutingRoute>
                <ViewRoutingRoute path="/users/:userId/wallets" layout={LayoutAnimated}>
                  <ViewWallets />
                </ViewRoutingRoute>
                <ViewRoutingRoute path="/users/:userId/wallets/:walletId" layout={LayoutAside}>
                  <ViewWallet />
                </ViewRoutingRoute>
                <ViewRoutingRoute path="/users/:userId/wallets/:walletId/transactions" layout={LayoutAnimated}>
                  {/* <ViewTransactions /> */}
                </ViewRoutingRoute>
                <ViewRoutingRoute path="/users/:userId/wallets/:walletId/transactions/:transactionId" layout={LayoutAside}>
                  {/* <ViewTransaction /> */}
                </ViewRoutingRoute>
                {/* <ViewRoutingRoute path="/wallets">Wallets</ViewRoutingRoute>
                <ViewRoutingRoute path="/wallets/:walletId">WalletId</ViewRoutingRoute>
                <ViewRoutingRoute path="/transactions">Transactions</ViewRoutingRoute>
                <ViewRoutingRoute path="/transactions/:transactionId">TransactionId</ViewRoutingRoute>         */}
              </ViewRouting>
            </Route>
            <Route path="/wallets">
              <ViewRouting maxRoutingViews={2}>
                <ViewRoutingRoute path="/wallets" layout={LayoutAnimated}>
                  <ViewWallets />
                </ViewRoutingRoute>
                <ViewRoutingRoute path="/wallets/:walletId" layout={LayoutAside}>
                  <ViewWallet />
                </ViewRoutingRoute>
              </ViewRouting>
            </Route>
            <Route path="/transactions">
              <ViewRouting maxRoutingViews={2}>
                <ViewRoutingRoute path="/transactions" layout={LayoutAnimated}>
                  <ViewTransactions />
                </ViewRoutingRoute>
                <ViewRoutingRoute path="/transactions/:transactionId" layout={LayoutAside}>
                  <ViewTransaction />
                </ViewRoutingRoute>
              </ViewRouting>
            </Route>
            <Route path="/">
              <ViewHome/>
            </Route>
          </Switch>

          {/* <Switch>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/users">
              <UsersView />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch> */}
        </LayoutMain>
      </Router>
    </StickyContainer>
  )
}

export default ViewMain;
