import React from "react";
import Navbar from "../components/Navigation";
import Button from "@material-ui/core/Button";
import { useStyles } from "../components/Styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default function Home() {
  const classes = useStyles();
  const navItem = [];

  return (
    <>
      <div className={classes.pageWrap}>
        <Navbar navItems={navItem}>
        <h1 style={{fontStyle: "Italic"}}>Supply Chain For the Future Business</h1>
        <h2 style={{fontStyle: "Italic"}}>Build Your Supply Chain</h2>
          <Grid
            container
            spacing={3}
            style={{ height: "100%", minHeight: "90vh", width: "100%" }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <div className={classes.HomeCardWrap}>
                <h2 className={classes.pageHeading}>Add the Ethereum admin roles address</h2>
                <Link
                  to="/adminRoles"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    color="primary"
                  >
                    Add Address
                  </Button>
                </Link>
                <br />

                <h2 className={classes.pageHeading}>Check the admin processes</h2>
                <Link
                  to="/manufacturer/manufacture"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Manufacturer
                  </Button>
                </Link>
                <Link
                  to="/Delivery/receive"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    delivery
                  </Button>
                </Link>
                <Link
                  to="/ThirdParty/allProducts"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Third party
                  </Button>
                </Link>
                <Link
                  to="/Customer/buy"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    customer
                  </Button>
                </Link>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                alt="."
                src="/supplychain.jpeg"
                style={{ width: "90%", height: "45%" }}
              />
            </Grid>
          </Grid>
        </Navbar>
      </div>
    </>
  );
}
