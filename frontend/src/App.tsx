import {Container, Typography} from "@mui/material";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/login";
import Register from "./features/users/Register";
import Items from "./features/items/items";
import NewItem from "./features/items/NewItem";
import OneItem from "./features/items/OneItem";

const App = () => {

  return (
      <>
        <header>
          <AppToolbar/>
        </header>
          <Container maxWidth="xl" component="main">
              <Routes>
                  <Route path="/" element={<Items />} />
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/categories/:categoryId" element={<Items />} />
                  <Route path="/items/new" element={<NewItem />} />
                  <Route path="/items/:id" element={<OneItem />} />
                  <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
              </Routes>
          </Container>
      </>
  )
}

export default App
