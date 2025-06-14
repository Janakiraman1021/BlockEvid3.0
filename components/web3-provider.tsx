"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { BrowserProvider, JsonRpcSigner } from "ethers"

interface Web3ContextType {
  connectWallet: (type: "metamask" | "walletconnect") => Promise<boolean>
  disconnectWallet: () => void
  isConnected: boolean
  address: string | null
  chainId: number | null
  provider: BrowserProvider | null
  signer: JsonRpcSigner | null
  error: string | null
}

const Web3Context = createContext<Web3ContextType>({
  connectWallet: async () => false,
  disconnectWallet: () => {},
  isConnected: false,
  address: null,
  chainId: null,
  provider: null,
  signer: null,
  error: null,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Check if MetaMask is installed
  const checkMetaMask = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      return true
    }
    setError("MetaMask is not installed. Please install MetaMask to continue.")
    return false
  }

  // Initialize provider and signer
  const initializeProvider = async () => {
    if (!checkMetaMask()) return

    try {
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      const address = await signer.getAddress()

      setProvider(provider)
      setSigner(signer)
      setChainId(Number(network.chainId))
      setAddress(address)
      setIsConnected(true)
      setError(null)

      return true
    } catch (err) {
      setError("Failed to initialize Web3 provider")
      console.error(err)
      return false
    }
  }

  // Connect wallet
  const connectWallet = async (type: "metamask" | "walletconnect") => {
    if (!checkMetaMask()) return false

    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" })
      return await initializeProvider()
    } catch (err) {
      setError("Failed to connect wallet")
      console.error(err)
      return false
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setChainId(null)
    setProvider(null)
    setSigner(null)
  }

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAddress(accounts[0])
        }
      })

      window.ethereum.on("chainChanged", (chainId: string) => {
        setChainId(parseInt(chainId, 16))
      })

      // Check if already connected
      initializeProvider()
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners()
      }
    }
  }, [])

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        disconnectWallet,
        isConnected,
        address,
        chainId,
        provider,
        signer,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)
