import {Container, Typography} from "@mui/material";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/login";
import Register from "./features/users/Register";
import Products from "./features/products/products";

const App = () => {

  return (
      <>
        <header>
          <AppToolbar/>
        </header>
          <Container maxWidth="xl" component="main">
              <Routes>
                  <Route path="/" element={<Products />} />
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/categories/:categoryId" element={<Products />} />
                  <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
              </Routes>
          </Container>
      </>
  )
}

export default App
