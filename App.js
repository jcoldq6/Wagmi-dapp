import {WagmiConfig, createClient, defaultChains, configureChains,} from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { NetworkSwitcher } from './switchNetwork'
import { Profile } from './profile'
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
  publicProvider(),
])
 
// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
 

// Pass client to React Context Provider
export default function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
      <NetworkSwitcher />
    </WagmiConfig>
  )
}