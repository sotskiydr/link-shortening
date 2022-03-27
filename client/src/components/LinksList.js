import { Link } from 'react-router-dom'

export const LinksList = ({links}) => {
  if(links.length === 0) {
    return <p className='center'>Not links</p>
  }
  return(
    <table style={{marginTop: '20px'}}>
      <thead>
      <tr>
        <th>№</th>
        <th>Original</th>
        <th>Short</th>
        <th>Open</th>
      </tr>
      </thead>
      <tbody>
      {links.map((el, index) => {
        return (
          <tr key={el._id}>
            <td>{index + 1}</td>
            <td>{el.from}</td>
            <td>{el.to}</td>
            <td><Link to={`/detail/${el._id}`}>Open</Link></td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}