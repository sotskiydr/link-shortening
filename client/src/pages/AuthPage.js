import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/htttp.hook.js'
import {useMessage} from '../hooks/message.hook.js'


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading,request,error,clearError} = useHttp()
  const [form,setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  },[error,message,clearError])

  const changeHandler = e => {
    setForm({ ...form , [e.target.name]: e.target.value})
  }

  const registerHandler = async () => {
    try{
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    }catch (e){}
  }
  const loginHandler = async () => {
    try{
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)

    }catch (e){}
  }

  return(
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1>Short link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name='email'
                  className='yellow-input'
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name='password'
                  className='yellow-input'
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className='btn yellow darken-4'
              style={{marginRight:10}}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              className='btn grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}