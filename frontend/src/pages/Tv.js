import installation from '../images/tvinstall.jpg'

export default function Tv() {
  return (
    <div className="tv-container">
      <section>
        <h1>TV and Home Theater</h1>
        <img src={installation} className='tv-picture' />
        <div className='tv-text'>
          <h2 className='tv-stuff-header'>TV people doing TV stuff with TVs</h2>
          <p className='tv-stuff-text'>We can send these people to their tv stuff with tvs for your so you can tv.</p>
        </div>
      </section>

    </div>
  );
}
