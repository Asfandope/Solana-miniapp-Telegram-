import { Outlet } from "react-router-dom";
import WalletConnect from "./component/WalletConnect/WalletConnect";
import { useWallet } from "@solana/wallet-adapter-react";
// import { TonConnectButton } from "@tonconnect/ui-react";

export default function Layout() {
  const wallet = useWallet();
  console.log({ wallet });
  return (
    <div>
      <div className="mt-8 mb-4 flex justify-end px-2">
        <WalletConnect />
      </div>
      <Outlet />
    </div>
  );
}
