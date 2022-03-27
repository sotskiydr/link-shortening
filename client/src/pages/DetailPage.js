import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/htttp.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'


export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id
  useEffect(async () => {
    try{
      const fetched = await request(`/api/link/${linkId}`, 'GET' , null,{
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    }catch (e) {}
  }, [token,linkId,request])
    if(loading) return <Loader/>
    return (
        <>
          {!loading && link && <LinkCard link={link}/>}
        </>
    )
}