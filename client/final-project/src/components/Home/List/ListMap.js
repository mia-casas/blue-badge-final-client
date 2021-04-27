import React from 'react';
import {Table, Row, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';


const ListMap = (props) => {
    const deleteList = (list) =>{
        fetch(`http://localhost:5005/list/delete/${list.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then(() => props.fetchLists())
    }

  const displayList = () => {  
    return props.lists.map((list, index) => {
        return(   
        <tr key={index}>
            <td>{list.item}</td>
            <td>{list.quantity}</td>
            <td>{list.category}</td>
            <td>
                
                <UncontrolledButtonDropdown>
                    <DropdownToggle color="warning">
                        Edit
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => {props.editUpdateList(list); props.updateOn()}}>Edit</DropdownItem>
                        <DropdownItem onClick={() => {deleteList(list)}}>Remove</DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </td>
        </tr>
        )
    })
}
return (
   <> 
   <h3>My List</h3>
   <Table borderless size="sm" hover>
       <thead></thead>
       <tbody>
           {displayList()}
       </tbody>
   </Table>
   </>
  )
}

export default ListMap