const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className="card bg-neutral text-neutral-content w-96">

      <form onSubmit={onSubmit} className="card-body items-center text-center w-96">
        <h2 className="card-title">{label}</h2>

        <div>
          <label className="input input-bordered" htmlFor='username'>
            <input type="text" id={`${label}username`} value={username} placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
          </label>
        </div>

        <div>
          <label className="input input-bordered" htmlFor='password'>

            <input type="password" id={`${label}password`} value={password} placeholder='Password' onChange={(event) => setPassword(event.target.value)} />
          </label>
        </div>

        <button className="btn btn-primary">{`${label}`}</button>
      </form>

    </div>

  );
};

export default Form;
