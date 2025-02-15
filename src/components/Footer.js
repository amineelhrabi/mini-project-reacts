import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="col-sm-12 bg-primary d-flex align-items-center justify-content-center gap-2 text-white py-2">
        <div className="logo_container">
          <img src="../logo192.png" alt="" />
        </div>
        <span className="fs-5 fw-semibold">&copy; {currentYear}</span>
      </div>
      <div className="col-sm-12 bg-primary d-flex align-items-center justify-content-center gap-2 text-white">
        <div className="d-flex align-items-center justify-content-center gap-2 text-white py-2">
          <li className="nav-link">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagramSquare className="fs-2 text-white" />
            </a>
          </li>
          <li className="nav-link">
            <a href="https://facebook.com/" target="_blank" rel="noreferrer">
              <FaFacebookSquare className="fs-2 text-white" />
            </a>
          </li>
          <li className="nav-link">
            <a href="https://x.com/?lang=fr" target="_blank" rel="noreferrer">
              <FaSquareXTwitter className="fs-2 text-white" />
            </a>
          </li>
          <li className="nav-link">
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <FaYoutubeSquare className="fs-2 text-white" />
            </a>
          </li>
          <li className="nav-link">
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedin className="fs-2 text-white" />
            </a>
          </li>
        </div>
      </div>
    </>
  );
}

export default Footer;
