import React, {useState, useEffect} from 'react'
import "./File.css";
import pinFileToIPFS from "../../utils/PinFileToIPFS.js";
import postJSONBody from '../../utils/postJsonBody';
import { useEth } from '../../contexts/EthContext';
import keys from "./keys.js";
require('dotenv').config();
export default function File() {
    const key = keys.key;
    const secret = keys.secret;
    const [imageLink, setImageLink] = useState();
    const { state: { contract, accounts } } = useEth();

    //metadatas : 
    const [tirage, setTirage] = useState();
    const [name, setName] = useState();
    const [width, setWidth] = useState();
    const [artist, setArtist] = useState();

    //Lien metadatas : 
    const [uri, setUri] = useState();


    const onChange = async (e) => {
        const file = e.target.files[0];
        try{
        const rep = await pinFileToIPFS(key, secret, file);
        const ipfsFile = "https://gateway.pinata.cloud/ipfs/" + rep.data.IpfsHash;
        setImageLink(ipfsFile);
        }
        catch(error){
            console.error(error);
        } 
    }

    const meta =async () => {
        if(tirage === undefined || width === undefined || name === undefined || artist === undefined){
            alert("Metadatas non remplies")
        }else{
            try{
                // obligé de mettre les données en dur, pas encore résolu
                const responseJSON = await postJSONBody(key, secret, name, artist, imageLink, width);
                setUri("https://gateway.pinata.cloud/ipfs/" + responseJSON.data.IpfsHash);
            }catch(e){
                console.log(e)
            }
        }
    }

    const mint = async () => {
        await contract.methods.mint(tirage, uri).send({from:accounts[0]});
    }
console.log(contract)
    const handleTirage = (e) => {
        setTirage(e);
    }

    const handleName = (e) => {
        setName(e);
    }

    const handleArtist = (e) => {
        setArtist(e);
    }

    const handleWidth = (e) => {
        setWidth(e);
    }

    if(imageLink === undefined && artist === undefined && name === undefined && width === undefined){
    return (
        <div id ="file">
            <h2>Mint un nft</h2>
            <input type='file' onChange={onChange}/>
        </div>
      )
    }else if(imageLink.length > 0 && uri === undefined){
        return(
            <div id ="file">
            <h2>Mint un nft</h2>
            <h3>Ajouter des métadonnées : </h3>

            {/* A changer selon le modèle final */}
            <label htmlFor='tirages'>Nombre de tirage : </label>
            <input onChange={e => {handleTirage(e.target.value)}} name='tirages' type='text'/>
            <br/>
            <label  htmlFor='name'>Nom : </label>
            <input onChange={e => {handleName(e.target.value)}} name='name' type='text'/>
            <br/>
            <label htmlFor='largeur'>Largeur de l'image : </label>
            <input onChange={e => {handleWidth(e.target.value)}} name='largeur' type='text'/>
            <br/>
            <label htmlFor='artiste'>artist : </label>
            <input onChange={e => {handleArtist(e.target.value)}} name='artiste' type='text'/>
            <br/>
            <button onClick={meta}>Ajouter les métadonnées</button>
            </div>
        )
    }
    else if(imageLink.length > 0 && uri.length > 0 && accounts != undefined){
        return(
        <div id='file'>
            <p>Vos métadonnées sont prêtes vous pouvez les consulter <a href={uri}>ici</a></p>
            <br/>
            <p>Addresse de la collection (pour l'ajouter sur metamask) : {contract._address}</p>
            <br/>
            <button onClick={mint}>Mint</button>
        </div>
        )
    }
        
}
