import React from 'react'
import "./Profil.css";
import { useEth } from '../contexts/EthContext';
export default function Profil() {
    const { state: { accounts } } = useEth();
    if(accounts === null){
        return(<></>)
    }else{
        return(
            <div id="profil">
                <p>{accounts[0]}</p>
            </div>
          )
    }
}
