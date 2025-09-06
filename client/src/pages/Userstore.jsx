import { useEffect, useState } from "react";
import api from "../api/api";
import StoreCard from "../components/StoreCard";

export default function UserStores() {
 const [ stores, setStores ] = useState( [] );

 useEffect( () => {
  fetchStores();
 }, [] );

 async function fetchStores() {
  const res = await api.get( "/stores" );
  setStores( res.data );
 }

 async function handleRate( storeId, rating ) {
  await api.post( `/stores/${storeId}/rate`, { rating } );
  fetchStores(); // refresh
 }

 return (
  <div className="p-6 max-w-2xl mx-auto">
   <h2 className="text-xl font-bold mb-4">Browse Stores</h2>
   { stores.map( ( s ) => (
    <StoreCard key={ s.id } store={ s } onRate={ handleRate } />
   ) ) }
  </div>
 );
}
