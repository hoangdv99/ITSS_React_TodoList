function TodoItem({ todo, onCheck }) {
  const handleChange = () => {
    onCheck(todo);
  }  
  return (
      <label className="panel-block">
        <input
          type="checkbox"
          checked={ todo.done }
          onChange={ handleChange }
        />
        <span className={ todo.done ? 'has-text-grey-light' : '' }>
          {todo.todo}
        </span>
      </label>
    );
  }
  
  export default TodoItem;