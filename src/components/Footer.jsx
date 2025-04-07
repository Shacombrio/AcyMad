const Footer = () => {
    return (
      <footer className="footer">
        <div className="footerContent">
          <div className="footerLogo">
            <h2>AC&MAD</h2>
            <p>Craftsmanship Meets Modern Design</p>
          </div>
          <div className="footerLinks">
            <div className="footerLinkGroup">
              <h3>Navigation</h3>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="#products">Products</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="footerLinkGroup">
              <h3>Products</h3>
              <ul>
                <li>
                  <a href="#chairs">Chairs</a>
                </li>
                <li>
                  <a href="#tables">Tables</a>
                </li>
                <li>
                  <a href="#storage">Storage</a>
                </li>
                <li>
                  <a href="#lighting">Lighting</a>
                </li>
              </ul>
            </div>
            <div className="footerLinkGroup">
              <h3>Contact</h3>
              <ul>
                <li>info@acandmad.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Craft Street, Design District</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>&copy; {new Date().getFullYear()} AC&MAD. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;