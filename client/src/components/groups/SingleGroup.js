import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const SingleGroup = () => {
  const [group, setGroup] = useState([])
  const [hasError, setHasError] = useState(false)
  const { id } = useParams()
  useEffect( () => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/groups/${id}`)
        setGroup(data)
        console.log('GROUP', group)
      } catch (err) {
        setHasError(true)
        console.log('ERROR WHILE GETTING GROUP DATA', err)
      }
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  console.log('DATA', group)
  return (
    <section>
      {group ?
        <div className='title'>
          <h2>{group.name}</h2>
          {/* <h4>{group.location}</h4> */}
        </div>
        :
        <h2>
          {hasError ? 'Something has gone wrong!' : 'loading...group'}
        </h2>
      }
    </section>
  )
}
export default SingleGroup