import WalletConnect from "./components/WalletConnect";
import Balances from "./components/Balances";
import PoolInfo from "./components/PoolInfo";
import Swap from "./components/Swap";
import Liquidity from "./components/Liquidity";
import RemoveLiquidity from "./components/RemoveLiquidity";
import { BlockchainProvider } from "./context/BlockchainContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  return (
    <BlockchainProvider>
      <main className="container py-4">
        <h1 className="text-center text-primary mb-4">🌀 SimpleSwap DApp</h1>
        <WalletConnect />
        <Balances />
        <PoolInfo />
        <Swap />
        <Liquidity />
        <RemoveLiquidity />
      </main>
      <Footer />
    </BlockchainProvider>
  );
}

export default App;
