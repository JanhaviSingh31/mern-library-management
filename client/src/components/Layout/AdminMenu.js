import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
 <>
 <div className="text-center">
 <div className="list-group">
 <h4>Admin Pannel</h4>
 <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Book Category</NavLink>
 <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Add Book</NavLink>
 <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Books</NavLink>
 <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>

</div>

 </div>

 </>
  )
}

export default AdminMenu
