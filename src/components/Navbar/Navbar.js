import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => window.location.reload()}>
        <img
          src="https://photo-folio-cn.netlify.app/assets/logo.png"
          alt="PhotoFolio Logo"
        />

        <h2>PhotoFolio</h2>
      </div>
    </nav>
  );
}

export default Navbar;
