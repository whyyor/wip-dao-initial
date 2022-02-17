import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";

import { useState, useEffect, createContext } from 'react'

import WIP from './WIP.json'

const contractAddress = '0x1617cE0Ab81a95013F28c6B06C8a51fc94B1EcD7'

export const WalletContext = createContext()

const Wallet = function ({ children }) {
    const [accounts,setAccounts] = useState([])
    const [isConnected,setIsConnected] = useState(false)
    const [web3,setWeb3] = useState(new Web3(Web3.givenProvider))
    //this web3.givenprovider comes from etherjs docs it's defualt web3 provider

    const [contract,setContract] = useState(
        new web3.eth.Contract(WIP.abi,contractAddress)
    )

    const [balance,setBalance] = useState(0)
    const [canPost,setCanPost] = useState(false)
    const [canComment,setCanComment] = useState(false)

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

    const fetchBalance = async function(){
        if(accounts.length>0){
            const b = await contract.methods.balanceOf(accounts[0]).call();
            //method is given in contract
            setBalance(b);

            const cp = await contract.methods.canPost(accounts[0]).call();
            setCanPost(cp)

            const cc = await contract.methods.canComment(accounts[0]).call();
            setCanComment(cc)
        } else {
            setBalance(0)
            setCanPost(false)
            setCanComment(false)
        }
    }

    useEffect(()=>{
        if(accounts.length>0){
            setIsConnected(true)
        }else{
            setIsConnected(false)
        }
        fetchBalance()
    },[accounts])

    useEffect(()=>{
        web3.eth.getAccounts().then(setAccounts)
        web3.currentProvider.on('accountsChanged',setAccounts)
        web3.currentProvider.on('disconnect',function(){
            setAccounts([])
        })
        setContract(new web3.eth.Contract(WIP.abi,contractAddress))
    },[web3])


    const exp = {
        accounts,
        connect,
        isConnected,
        balance,
        canPost,
        canComment,
        contract,
        web3,
        fetchBalance
    }
  // TODO!
  return(
      <WalletContext.Provider value={exp}>
          {children}
      </WalletContext.Provider>
  )
}

export default Wallet
