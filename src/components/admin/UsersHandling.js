import React from 'react'
import { useState, useEffect  } from 'react'
import { useHistory } from 'react-router';
import { db } from '../../firebase/config';
import editIcon from '../../img/edit.png';

function UsersHandling() {
  const history = useHistory();
  const [ users, setUsers ] = useState([]);
  const [ adding, setAdding ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ username, setUsername ] = useState('');

  const getAllUsers = () => {
    try {
      db.collection('users').get()
      .then(res => {
        setUsers(res.docs.map(doc => {
          return doc.data();
        }))
      }).catch(err => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateField = (username, id) => {
    if (username !== '') {
      db.collection('users').doc(id).update({
        username
      }).then(() => {
        setUpdate(false)
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      setUpdate(false);
    }
    setAdding(!adding);
  }

  const handleEdit = () => {
    setUpdate(true);
  }

  const deleteUser = (id) => {
    db.collection('users').doc(id).delete()
    .then(res => {
      
    }).catch(err => {
      console.log(err);
    })
    setAdding(!adding);
  }

  useEffect(() => {
    const deleteButton = document.querySelectorAll('.delete');

    deleteButton.forEach(button => {
      button.addEventListener('click', (e) => {
        const carId = e.target.dataset.target;
        deleteUser(carId);
      })
    });
  });

  useEffect(() => {
    getAllUsers();
  },[adding])

  return (
    <div className="container users">
      <h1 className="is-size-1 title">Users</h1>
      <button className="button is-light add-users m-2" onClick={() => history.push('/signup')} id="addUsers">Add Users</button>

        <table className="table users-table is-hoverable">
          <thead className="has-background-grey-dark">
            <tr className="">
              <th className="has-text-white-ter">Username</th>
              <th className="has-text-white-ter">Email</th>
              <th className="has-text-white-ter">Password</th>
              <th className="has-text-white-ter">Edit</th>
              <th className="has-text-white-ter">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.length > 0 ?
              users.map(obj => {
                return <tr key={obj.id}>
                  <td>{ update ? 
                    <input type='text' placeholder={obj.username} onChange={(e) => setUsername(e.target.value)} data-id={obj.id} onBlur={() => updateField(username, obj.id)} /> :
                    obj.username }
                  </td>
                  <td>{ obj.email }</td>
                  <td>{ obj.password }</td>
                  {
                    obj.username !== 'Admin' &&
                  <td>
                    <span className="icon">
                      <i className="fas fa-edit" onClick={(e) => handleEdit(e)} >
                        <img src={editIcon} className='edit' data-id={obj.id}/>
                      </i>
                    </span>
                  </td>
                  }
                  {
                    obj.username !== 'Admin' &&
                    <td>
                      <span className="icon delete" data-target={obj.id}>
                        <i className="fas">
                        </i>
                      </span>
                    </td>
                  }
                </tr>
              }) : 
              <tr>
                <td colSpan='8'>No users</td>
              </tr>
            }
          </tbody>
        </table>
    </div>
  )
}

export default UsersHandling
