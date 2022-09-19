import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  pageWrap: {
    textAlign: "center",
    color: "#386573",
  },
  pageHeading: {
    textAlign: "center",
    margin: "10px auto",
    padding: 0,
    color: "#386573",
  },

  TableRoot: {
    width: "100%",
    maxWidth: 1200,
    margin: "5px auto",
    border: "2px solid #386573",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #ad7c2b",
  },
  TableContainer: {
    maxHeight: 600,
    borderRadius: 7,
  },
  AddressCell: {
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableCount: {
    textAlign: "center",
    margin: "10px auto",
    padding: 0,
    color: "#386573",
  },
  TableHead: {
    backgroundColor: "#386573 !important",
    color: "#ffa500 !important",
  },
  TableCell: {
    color: "#386573 !important",
  },

  FormWrap: {
    maxWidth: 900,
    margin: "30px auto",
    padding: 20,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #ad7c2b",
  },

  RoleForm: {
    display: "flex",
    alignItems: "center",
    margin: "20px auto",
  },

  //Find
  Explorerroot: {
    padding: "2px 4px",
    margin: "10px",
    width: "100%",
  },
  ProductPaper: {
    maxWidth: 700,
    margin: "30px auto",
    padding: 10,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #ad7c2b",
    border: "2px solid #386573",
  },
  ExplorerdRow: {
    width: "100%",
    borderBottom: `0px solid #222`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: "0 auto",
    fontWeight: 600,
    color: "#386573",
  },
  TableRoot2: {
    width: "100%",
    maxWidth: 1300,
    margin: "5px auto",
    border: "2px solid #386573",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #ad7c2b",
  },

  //Modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fff",
    padding: 15,
    outline: "none",
    width: "min(90%, 650px)",
    height: "80%",
    border: "2px solid #386573",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #ad7c2b",
    overflow: "scroll",
  },
  Reciptpaper: {
    backgroundColor: "#fff",
    border: "0px solid #000",
    padding: 15,
    outline: "none",
    width: "min(95%, 950px)", 
    height: "500px",
    border: "2px solid #386573",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #ad7c2b",
    overflow: "scroll",
  },
  dRow: {
    width: "100%",
    borderBottom: `1px solid #222`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: "0 auto",
  },

  dCol1: {
    width: "30%",
    textAlign: "left",
    fontWeight: 600,
    color: "#386573",
  },
  dCol2: {
    width: "70%",
    textAlign: "left",
    fontWeight: 600,
    color: "#386573",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  //Home
  HomeBtn: {
    margin: 10,
  },
  HomeCardWrap: {
    maxWidth: 500,
    width: "90%",
    padding: 20,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #ad7c2b",
    border: "2px solid #386573",
    margin: "10px auto",
  },
});
