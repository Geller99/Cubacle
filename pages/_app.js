import "../styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  defaultChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import Header from "../components/header/header";
import SideNav from "../components/side-nav/nav";
import Layout from "../components/Layout";
import { useStore } from "../state/useStore";
import { MyStore } from "../state/myStore";


const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.goerli],
  [alchemyProvider({ apiKey: "Nvjk-5BRH6VLoWqiFTVWzZPacNMGaHYC" })]
);

const { connectors } = getDefaultWallets({
  appName: "Cubase",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const App = ({ Component, pageProps }) => {
  const myStore = useStore();

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <MyStore.Provider value={myStore}>
          <Layout>
            <Component {...pageProps} />{" "}
          </Layout>
        </MyStore.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
