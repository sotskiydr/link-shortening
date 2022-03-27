import React, { useContext, useState } from 'react'
import { useHttp } from '../hooks/htttp.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext)
  const [link, setLink] = useState('')
  const {request} = useHttp()
  const pressHandler = async (e) => {
    if(e.key === 'Enter'){
      try{
        const data = await request('/api/link/generate' , 'POST', {from: link},{
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`)
      }catch (e) {
        
      }
    }
  }

    return (
        <div>
            <div className='col s8 offset-s2' style={{paddingTop: '2rem'}}>
              <div className="input-field">
                <input
                  placeholder="Insert link"
                  id="link"
                  type="text"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  onKeyPress={pressHandler}
                />
              </div>
            </div>
        </div>
    )
}