import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";

import { useState, useEffect, createContext } from 'react'

export const WalletContext = createContext()

const Wallet = function ({ children }) {
    const [accounts,setAccounts] = useState([])
    const [isConnected,setIsConnected] = useState(false)
    const [web3,setWeb3] = useState(new Web3(Web3.givenProvider))
    //this web3.givenprovider comes from etherjs docs it's defualt web3 provider

    const connect = async function(){
        if(window){
            const web3Modal = new Web3Modal({
                network: 'ropsten',
                providerOptions: {
                    walletConnect: {
                        package: WalletConnectProvider,
                        options: {
                            infuraId: 'd1b36e5129b4479f842a7d30ad57c892'
                        }
                    }
                }
            })

            const provider = await web3Modal.connect() //now the provider could be
            //metamask or the other wallet
            setWeb3(new Web3(provider))//we want to implement web based on
            //that provider
        }
    }

    useEffect(()=>{
        if(accounts.length>0){
            setIsConnected(true)
        }else{
            setIsConnected(false)
        }
    },[accounts])

    useEffect(()=>{
        web3.eth.getAccounts().then(setAccounts)
        web3.currentProvider.on('accountsChanged',setAccounts)
        web3.currentProvider.on('disconnect',function(){
            setAccounts([])
        })
    },[web3])

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
