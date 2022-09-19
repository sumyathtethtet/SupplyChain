import React from 'react';
import ResponsiveDrawer from "../components/Navigation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRole } from "../context/RoleContext";
import { useStyles } from "../components/Styles";

function AdminRoles(props) {
  const accounts = props.accounts;
  const supplyChainContract = props.supplyChainContract;
  const { roles, setRoles } = useRole();

  const classes = useStyles();
  const [manufacturerRole, setManufacturerRole] = React.useState("");
  const [thirdPartyRole, setThirdPartyRole] = React.useState("");
  const [deliveryRole, setDeliveryRole] = React.useState("");
  const [customerRole, setCustomerRole] = React.useState("");
  const navItem = [];

  const handleAddManufacturerAdmin = async () => {
    await setRoles({
      ...roles, 
      manufacturer : manufacturerRole
    })

    localStorage.setItem("mRole", manufacturerRole);
    await supplyChainContract.methods.addManufacturerAdmin(manufacturerRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setManufacturerRole("");
  }
  
  const handleAddThirdPartyAdmin = async () => {
    await setRoles({
      ...roles, 
      thirdparty : thirdPartyRole
    })

    localStorage.setItem("tpRole", thirdPartyRole);
    await supplyChainContract.methods.addThirdPartyAdmin(thirdPartyRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setThirdPartyRole("");
  }

  const handleAddDeliveryAdmin = async () => {
    await setRoles({
      ...roles, 
      delivery : deliveryRole
  })

   localStorage.setItem("dRole", deliveryRole);
    await supplyChainContract.methods.addDeliveryAdmin(deliveryRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

    

    setDeliveryRole("");
  }

  const handleAddCustomerAdmin = async () => {
    await setRoles({
      ...roles, 
    customer : customerRole
  })

   localStorage.setItem("cRole", customerRole);
    await supplyChainContract.methods.addCustomerAdmin(customerRole).send({ from: accounts[0], gas:100000 })
    .then(console.log);

   

    setCustomerRole("");
  }


  return (
    <div>
      <ResponsiveDrawer navItems={navItem}>
      <div className={classes.FormWrap}>
      <h1 className={classes.pageHeading}>Add Ethereum Unique Address</h1>
      {console.log(roles)}
      
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="manufacturerRole"
            label="Enter Manufacturer Ethereum Address"
            variant="outlined"
            value={manufacturerRole}
            onChange={(e) => setManufacturerRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddManufacturerAdmin}
            style={{width:"20%", marginLeft:"30px"}}
          >
            Save Manufacturer
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="thirdPartyRole"
            label="Enter Third Party Ethereum Address "
            variant="outlined"
            value={thirdPartyRole}
            onChange={(e) => setThirdPartyRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddThirdPartyAdmin}
            style={{width:"20%", marginLeft:"30px"}}
          >
            Save Third Party
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="deliveryRole"
            label="Enter Delivery Ethereum Address"
            variant="outlined"
            value={deliveryRole}
            onChange={(e) => setDeliveryRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDeliveryAdmin}
            style={{width:"20%", marginLeft:"30px"}}
          >
            Save delivery
          </Button>
        </div>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.RoleForm} >
          <TextField
            id="customerRole"
            label=" Enter Customer Ethereum Address"
            variant="outlined"
            value={customerRole}
            onChange={(e) => setCustomerRole(e.target.value)}
            style={{width:"70%"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCustomerAdmin}
            style={{width:"20%", marginLeft:"30px"}}
          >
            Save customer
          </Button>
        </div>
      </form>
      </div>
      </ResponsiveDrawer>
    </div>
  );
}

export default AdminRoles;
