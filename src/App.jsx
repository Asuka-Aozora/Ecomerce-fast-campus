import HomePage from "./pages/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import CartPage from "./pages/CartPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import ProductManagement from "./pages/admin/ProductManagement";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import { DelayProvider } from "./components/DelayContext";
import CounterPage from "./pages/CounterPage";
import RegisterPage from "./pages/RegisterPage";
import { useHydration } from "./hooks/useHydration";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailPage from "./pages/HistoryDetailPage";

function App() {
  const location = useLocation();
  const { isHydrated } = useHydration();

  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <DelayProvider>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/counter" Component={CounterPage} />
          <Route path="/history" Component={HistoryPage} />
          <Route path="/history/:transactionId" Component={HistoryDetailPage} />
          <Route path="/products/:productId" Component={ProductDetail} />

          <Route path="/admin">
            <Route path="products" Component={ProductManagement} />
            <Route path="products/create" Component={CreateProductPage} />
            <Route
              path="products/edit/:productId"
              Component={EditProductPage}
            />
          </Route>

          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </DelayProvider>

      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
