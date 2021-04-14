import moment from 'moment';

function TodoItem({ todo, onCheck }) {
  const handleChange = () => {
    onCheck(todo);
  }
  return (
    <div className="card">
      <div className="card-content">
        <div className="content" >
          <label className="">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={handleChange}
            />
            <span style={{ marginLeft: 10 }} className={todo.done ? 'has-text-grey-light' : ''}>
              {todo.todo} 
            </span>
          </label>
          <br></br>
          <time 
            style={{ fontSize:12, fontStyle:'italic' }}
            className={todo.done ? 'has-text-grey-light' : ''}
          >
            Created At: { moment(todo.createdAt).calendar() } 
          </time>
        </div>
      </div>
    </div>

  );
}

export default TodoItem;