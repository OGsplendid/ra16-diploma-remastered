import { Footer } from "./pages/footer/Footer";
import { Header } from "./pages/header/Header";
import "./App.css"
import { MainContainer } from "./pages/MainContainer";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { Contacts } from "./pages/Contacts";
import { Main } from "./pages/Main";
import { Catalog } from "./pages/Catalog";
import { ProductPage } from "./pages/ProductPage";
import { Cart } from "./pages/Cart";

function App() {

  return (
    <>
      <Header />
        <MainContainer>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/catalog" element={<Catalog withSearchField={true} />} />
            <Route path="/catalog/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </MainContainer>
      <Footer />
    </>
  )
}

export default App
