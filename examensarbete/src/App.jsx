import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./core/router/router";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <AppRouter />
      </ShopContextProvider>
    </div>
  );
}
export default App;
