import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect, useMemo } from "react";
import Home from "./page/Home";
import Ranking from "./page/Ranking";
import Quest from "./page/Quest";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import Layout from "./Layout";
import Loading from "./component/Loading";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Boost from "./page/Boost";
import Mine from "./page/Mine";
import Friends from "./page/Friends";
import Earn from "./page/Earn";
import Airdrop from "./page/AirDrop";
import "react-toastify/dist/ReactToastify.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { TrustWalletAdapter } from '@solana/wallet-adapter-trust';
import { SafePalWalletAdapter } from '@solana/wallet-adapter-safepal';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';

function App() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = "https://sleek-crimson-cherry.solana-mainnet.quiknode.pro/3d39520919964d711b19d4de5d054aa1b206cfc5";
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
      new SafePalWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            {loading ? (
              <Loading />
            ) : (
              <div className="App flex flex-col justify-between w-[700px] max-sm:w-[750px] bg-[#1B1F24]">
                <ReduxProvider store={store}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="leaderboard" element={<Ranking />} />
                      <Route path="quest" element={<Quest />} />
                      <Route path="boost" element={<Boost />} />
                      <Route path="mine" element={<Mine />} />
                      <Route path="friends" element={<Friends />} />
                      <Route path="tasks" element={<Earn />} />
                      <Route path="airdrop" element={<Airdrop />} />
                    </Route>
                  </Routes>
                  <ToastContainer />
                  <Footer />
                </ReduxProvider>
              </div>
            )}
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
