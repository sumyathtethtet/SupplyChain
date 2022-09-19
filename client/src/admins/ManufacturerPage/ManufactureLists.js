import React from "react";
import Navbar from "../../components/Navigation";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { useStyles } from "../../components/Styles";
import ProductModal from "../../components/DataModal";
import clsx from "clsx";
import Loader from "../../components/Loading";

export default function ManufactureLists(props) {
  const supplyChainContract = props.supplyChainContract;
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const [manufactureLists, setManufactureLists] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navItem = [
    ["Add Product", "/manufacturer/manufacture"],
    ["Shipping Product", "/manufacturer/ship"],
    ["Product Lists", "/manufacturer/manufactureLists"],
  ];
  React.useEffect(() => {
    setLoading(true);
    (async () => {
      setLoading(true);
      const cnt = await supplyChainContract.methods.fetchItemCount().call();
      setCount(cnt);
    })();

    (async () => {
      const arr = [];
      for (var i = 1; i < count; i++) {
        const prodState = await supplyChainContract.methods
          .fetchItemState(i)
          .call();

        if (prodState === "0") {
          const prodData = [];
          const a = await supplyChainContract.methods
            .fetchItemPart1(i, "product", 0)
            .call();
          const b = await supplyChainContract.methods
            .fetchItemPart2(i, "product", 0)
            .call();
          const c = await supplyChainContract.methods
            .fetchItemPart3(i, "product", 0)
            .call();
          prodData.push(a);
          prodData.push(b);
          prodData.push(c);
          arr.push(prodData);
        }
      }
      setManufactureLists(arr);
      setLoading(false);
    })();
  }, [count]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);

  const handleClose = () => setOpen(false);

  const handleClick = async (prod) => {
    await setModalData(prod);
    setOpen(true);
  };

  return (
    <div classname={classes.pageWrap}>
      <Navbar titlePage={"Manufacturer"} navItems={navItem}>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <ProductModal
              prod={modalData}
              open={open}
              handleClose={handleClose}
            />
            <h1 className={classes.pageHeading}>Manufactured Products</h1>
            <h3 className={classes.tableCount}>
              Total Products : {manufactureLists.length}
            </h3>
            <>
              <div>
                <Paper className={classes.TableRoot}>
                  <TableContainer className={classes.TableContainer}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.TableHead} align="left">
                            Universal ID
                          </TableCell>
                          <TableCell
                            className={classes.TableHead}
                            align="center"
                          >
                            Product Code
                          </TableCell>
                          <TableCell
                            className={classes.TableHead}
                            align="center"
                          >
                            Product Name
                          </TableCell>
                          <TableCell
                            className={classes.TableHead}
                            align="center"
                          >
                            Manufacturer
                          </TableCell>
                          <TableCell
                            className={classes.TableHead}
                            align="center"
                          >
                            Manufacture Date
                          </TableCell>
                          <TableCell
                            className={clsx(
                              classes.TableHead,
                              classes.AddressCell
                            )}
                            align="center"
                          >
                            Owner Address
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {manufactureLists.length !== 0 ? (
                          manufactureLists
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((prod) => {
                              const d = new Date(parseInt(prod[1][0] * 1000));
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={prod[0][0]}
                                  onClick={() => handleClick(prod)}
                                >
                                  <TableCell
                                    className={classes.TableCell}
                                    component="th"
                                    align="left"
                                    scope="row"
                                  >
                                    {prod[0][0]}
                                  </TableCell>
                                  <TableCell
                                    className={classes.TableCell}
                                    align="center"
                                  >
                                    {prod[1][2]}
                                  </TableCell>
                                  <TableCell
                                    className={classes.TableCell}
                                    align="center"
                                  >
                                    {prod[1][1]}
                                  </TableCell>
                                  <TableCell
                                    className={classes.TableCell}
                                    align="center"
                                  >
                                    {prod[0][4]}
                                  </TableCell>
                                  <TableCell align="center">
                                    {d.toDateString() + " " + d.toTimeString()}
                                  </TableCell>
                                  <TableCell
                                    className={clsx(
                                      classes.TableCell,
                                      classes.AddressCell
                                    )}
                                    align="left"
                                  >
                                    {prod[0][2]}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                        ) : (
                          <> </>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 50, 100]}
                    component="div"
                    count={manufactureLists.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </>
          </div>
        )}
      </Navbar>
    </div>
  );
}
