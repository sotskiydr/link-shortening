import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/htttp.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
  useEffect(async () => {
    try{
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    }catch (e) {}
  }, [token, request])
  if(loading) return <Loader />
    return (
       <>
         {!loading && <LinksList links={links} />}
       </>
    )
}