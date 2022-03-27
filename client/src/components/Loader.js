export const Loader = () =>{

  return (
  <div style={{display: 'flex', margin: '100px auto 0', paddingTop: '2rem'}} className="preloader-wrapper big active">
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle"/>
      </div>
      <div className="gap-patch">
        <div className="circle"/>
      </div>
      <div className="circle-clipper right">
        <div className="circle"/>
      </div>
    </div>
  </div>
  )
}
