import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
 const [ stats, setStats ] = useState( {} );
 const [ users, setUsers ] = useState( [] );
 const [ stores, setStores ] = useState( [] );

 useEffect( () => {
  async function fetchData() {
   try {
    const s = await api.get( "/admin/dashboard" );
    setStats( s.data );

    const u = await api.get( "/admin/users" );
    setUsers( u.data );

    const st = await api.get( "/admin/stores" );
    setStores( st.data );
   } catch (error) {
    console.error("Error fetching admin data:", error);
    alert("Failed to load admin data");
   }
  }
  fetchData();
 }, [] );

 return (
  <div className="p-6">
   <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
   <p>Users: { stats.users }</p>
   <p>Stores: { stats.stores }</p>
   <p>Ratings: { stats.ratings }</p>

   <h3 className="mt-6 font-bold">Users</h3>
   <ul className="list-disc pl-6">
    { users.map( ( u ) => (
     <li key={ u.id }>{ u.name } ({ u.role })</li>
    ) ) }
   </ul>

   <h3 className="mt-6 font-bold">Stores</h3>
   <ul className="list-disc pl-6">
    { stores.map( ( st ) => (
     <li key={ st.id }>{ st.name } — ⭐ { st.avgRating?.toFixed( 1 ) || "N/A" }</li>
    ) ) }
   </ul>
  </div>
 );
}
