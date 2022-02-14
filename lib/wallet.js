import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";

import { useState, useEffect, createContext } from 'react'

export const WalletContext = createContext()

const Wallet = function ({ children }) {
    const [accounts,setAccounts] = useState([])
    const [isConnected,setIsConnected] = useState(false)

    const connect = async function(){
        setAccounts(['0xwhyyor'])
    }

    useEffect(()=>{
        if(accounts.length>0){
            setIsConnected(true)
        }
    },[accounts])

    const exp = {
        accounts,
        connect,
        isConnected
    }
  // TODO!
  return(
      <WalletContext.Provider value={exp}>
          {children}
      </WalletContext.Provider>
  )
}

export default Wallet
