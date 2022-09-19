import React from "react";
import Navbar from "../components/Navigation";
import CustomizedInputBase from "../components/Search";
import { useStyles } from "../components/Styles";
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ProductModal from "../components/DataModal";
import ModalRecipt from "../components/ModalRecipt";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Loader from "../components/Loading";

const columns = [
  { id: "id", label: "Universal ID", minWidth: 170 },
  { id: "mname", label: "Manfacturer", minWidth: 170 },
  { id: "pname", label: "Product Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "owner address", label: "Owner Address", minWidth: 170 },
  { id: "tracking", label: "Tracking", minWidth: 170 },
  { id: "mdate", label: "Date", minWidth: 170 },
];

const map = [
  "Product Manufactured",
  "Bought By Third Party",
  "Shipped From Manufacturer",
  "Received By Third Party",
  "Bought By Customer",
  "Shipped By Third Party",
  "Received By Delivery",
  "Shipped From Delivery",
  "Received By Customer",
];

export default function Explorer(props) {
  const classes = useStyles();
  const web3 = props.web3;
  const supplyChainContract = props.supplyChainContract;
  const [productData, setProductData] = React.useState([]);
  const [trackProduct, setTrackProduct] = React.useState([]);
  const [Text, setText] = React.useState(false);
  const navItem = [];
  const [modalData, setModalData] = React.useState([]);
  const [modalReciptData, setModalReciptData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openRecipt, setOpenRecipt] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const findProduct = async (search) => {
    var arr = [];
    var temp = [];
    setLoading(true);
    try {
      setProductData([]);
      setTrackProduct([]);
      var a = await supplyChainContract.methods
        .fetchItemPart1(parseInt(search), "product", 0)
        .call();
      var b = await supplyChainContract.methods
        .fetchItemPart2(parseInt(search), "product", 0)
        .call();
      var c = await supplyChainContract.methods
        .fetchItemPart3(parseInt(search), "product", 0)
        .call();
      temp.push(a);
      temp.push(b);
      temp.push(c);
      setProductData(temp);
      arr = [];
      var l = await supplyChainContract.methods
        .fetchItemHistoryLength(parseInt(search))
        .call();

      arr = [];
      for (var i = 0; i < l; i++) {
        var h = await supplyChainContract.methods
          .fetchItemPart1(parseInt(search), "history", i)
          .call();
        var k = await supplyChainContract.methods
          .fetchItemPart2(parseInt(search), "history", i)
          .call();
        var j = await supplyChainContract.methods
          .fetchItemPart3(parseInt(search), "history", i)
          .call();
        temp = [];
        temp.push(h);
        temp.push(k);
        temp.push(j);
        arr.push(temp);
      }
      setTrackProduct(arr);
    } catch (e) {
      setText(true);
      console.log(e);
    }
    setLoading(false);
  };

  const handleClose = () => setOpen(false);
  const handleCloseRecipt = () => setOpenRecipt(false);

  const handleClick = async (prod) => {
    await setModalData(prod);
    setOpen(true);
  };

  const fetchTxRecipt = async (hash) => {
    web3.eth.getTransaction(hash).then((recipt) => {
      setModalReciptData(recipt);
      setOpenRecipt(true);
    });
  };

  return (
    <>
      <Navbar navItems={navItem}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ProductModal
              prod={modalData}
              open={open}
              handleClose={handleClose}
            />
            <ModalRecipt
              recipt={modalReciptData}
              openRecipt={openRecipt}
              handleCloseRecipt={handleCloseRecipt}
            />
            <h1 className={classes.pageHeading}>Find a product</h1>
            <CustomizedInputBase findProduct={findProduct} />
            {productData.length !== 0 ? (
              <>             
                <Grid container className={classes.Explorerroot} spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.ProductPaper}>
                      <div>
                        <div className={classes.ExplorerdRow}>
                          Universal ID : {productData[0][0]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          SKU : {productData[0][1]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Owner Address : {productData[0][2]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer Address : {productData[0][3]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer Name : {productData[0][4]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer information : {productData[0][5]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Product Name : {productData[1][1]}
                        </div>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={() => handleClick(productData)}
                          style={{ margin: "10px auto" }}
                        >
                          Detail
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
                <br />              
                <h2 className={classes.tableCount}> Product Tracking</h2>
                <Paper className={classes.TableRoot2}>
                  <TableContainer className={classes.TableContainer}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align="center"
                              className={classes.TableHead}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                          <TableCell
                            align="center"
                            className={classes.TableHead}
                          >
                            Details
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.TableHead}
                          >
                            Recipt
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trackProduct.length !== 0 ? (
                          trackProduct.map((row) => {
                            const d = new Date(parseInt(row[1][0] * 1000));
                            console.log(JSON.stringify(d));
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row[0][0]}
                              >
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[0][0]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[0][4]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[1][1]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[1][3]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {row[0][2].length > 15
                                    ? row[0][2].substring(0, 15) + "..."
                                    : row[0][2]}
                                </TableCell>

                                <TableCell
                                  style={{ color: "#f00 !important" }}
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  {map[row[1][5]]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                  onClick={() => handleClick(row)}
                                >
                                  {d.toDateString() + " " + d.toTimeString()}
                                </TableCell>

                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleClick(row)}
                                  >
                                    DETAILS
                                  </Button>
                                </TableCell>

                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => fetchTxRecipt(row[2][5])}
                                  >
                                    RECIPT
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            ) : (
              <>{Text ? <p>Product Not Found</p> : <></>}</>
            )}
          </>
        )}
      </Navbar>
    </>
  );
}
