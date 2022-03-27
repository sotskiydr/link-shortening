export const LinkCard = ({link}) => {
  return (
    <>
      <h2>Link</h2>
      <p>your link: <a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a></p>
      <p>link from: <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></p>
      <p>ckicks amount: <strong>{link.clicks}</strong></p>
      <p>date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}