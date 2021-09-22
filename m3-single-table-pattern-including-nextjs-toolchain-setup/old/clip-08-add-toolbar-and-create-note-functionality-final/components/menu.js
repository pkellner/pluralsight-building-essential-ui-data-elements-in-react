function Menu({ createNoteFn }) {
  return (
    <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
      <li className="nav-item ml-auto">
        <a
          href="#"
          onClick={createNoteFn}
          className="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
        >
          <i className="icon-note m-1"></i>
          <span className="d-none d-md-block font-14">Add Notes</span>
        </a>
      </li>
    </ul>
  );
}

export default Menu;
