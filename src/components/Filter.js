function Filter( {value, onChange} ) {
    const handleClick = (key, e) => {
      e.preventDefault();
      onChange(key);
    }
    
    return (
      <div className="panel-tabs">
        <a
          href="#"
          onClick={handleClick.bind(null, 'ALL')}
          className={value === 'ALL' ?  'is-active' : ''}
        >All</a>
        <a
          href="#"
          onClick={handleClick.bind(null, 'TODO')}
          className={value === 'TODO' ?  'is-active' : ''}
        >Doing</a>
        <a
          href="#"
          onClick={handleClick.bind(null, 'DONE')}
          className={value === 'DONE' ?  'is-active' : ''}
        >Done</a>
      </div>
    );
  }
  
  export default Filter