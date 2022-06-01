import CurrencyConverter from "./components/CurrencyConverter";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <div className="app">
      <strong><b><h1 className="font-link">Crypto Dashboard</h1></b></strong>
      <div className="app-wrapper">
        <CurrencyConverter/>
        <NewsFeed/>
      </div>

      
    </div>
  );
}

export default App;
