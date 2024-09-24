export const FilterForm = ({name, setName, hideCompleted, setHideCompleted}) => {

  return (
    <form className="filter-form">
      <div className="filter-form-group">
        <label>Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <label>
        <input type="checkbox" checked={hideCompleted} onChange={e => setHideCompleted(e.target.checked)}  />
        Hide Completed
      </label>
    </form>
  );
}