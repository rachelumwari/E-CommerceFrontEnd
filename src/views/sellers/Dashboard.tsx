// import React, { useState } from "react";
// import {
//   AppBar,
//   Button,
//   Tab,
//   Tabs,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import DrawerComp from "../../components/DrawerComp";
// import Products from "./Products";
// // import Orders from "./Orders";
// import Profile from "./Profile";
// import { useNavigate } from "react-router-dom";

// const PAGES = ["Products", "Orders", "Profile"];

// const Dashboard = () => {
//   const [value, setValue] = useState<string>(PAGES[0]);
//   const theme = useTheme();
//   const isMatch = useMediaQuery(theme.breakpoints.down("md"));
//   const navigate = useNavigate();

//   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//     if (newValue === "Profile") {
//       navigate("/seller-profile");
//     }
//   };

//   return (
//     <React.Fragment>
//       <AppBar sx={{ background: "#3C2A21" }}>
//         <Toolbar>
//           <Typography sx={{ fontSize: "1.5rem", paddingLeft: "2px" }}>
//             !SHOP
//           </Typography>
//           {isMatch ? (
//             <>
//               {/* <Typography>
//                 !SHOP
//               </Typography> */}
//               <DrawerComp />
//             </>
//           ) : (
//             <>
//               <Tabs
//                 sx={{ marginLeft: "auto" }}
//                 textColor="inherit"
//                 value={value}
//                 onChange={handleChange}
//                 indicatorColor="primary"
//               >
//                 {PAGES.map((page, index) => (
//                   <Tab key={index} label={page} value={page} />
//                 ))}
//               </Tabs>
//               <Button
//                 sx={{ marginLeft: "auto", backgroundColor: "#1A120B" }}
//                 variant="contained"
//               >
//                 LOGOUT
//               </Button>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* body content */}
//       {value === "Products" && <ProductContent />}
//       {/* {value === "Orders" && <Orders />} */}
//       {value === "Profile" && <Profile />}
//     </React.Fragment>
//   );
// };

// const ProductContent = () => {
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     navigate("/seller-home");
//   }, []);

//   return <Products />;
// };

// export default Dashboard;

import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComp from "../../components/DrawerComp";
import Products from "./Products";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const PAGES = ["Products", "Orders", "Profile"];

const Dashboard = () => {
  const [value, setValue] = useState<string>(PAGES[0]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    // if (newValue === "Profile") {
    //   navigate("/seller-profile");
    // }
  };

  const handleLogout = () => {
    // code to handle logout
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#3C2A21" }}>
        <Toolbar>
          <Typography sx={{ fontSize: "1.5rem", paddingLeft: "2px" }}>
            !SHOP
          </Typography>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                textColor="inherit"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
              >
                {PAGES.map((page, index) => (
                  <Tab key={index} label={page} value={page} />
                ))}
              </Tabs>
              <Button
                sx={{ marginLeft: "auto", backgroundColor: "#1A120B" }}
                variant="contained"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* body content */}
      {value === "Products" && <ProductContent />}
      {value === "Orders" && <Orders />}
      {value === "Profile" && <ProfileContent />}
    </React.Fragment>
  );
};

const ProductContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/seller-home");
  }, []);

  return <Products />;
};

const Orders = () => {
  return <div>Orders</div>;
};

const ProfileContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/seller-profile");
  }, []);

  return <Profile />;
};

export default Dashboard;
