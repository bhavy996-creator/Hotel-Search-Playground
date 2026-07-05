import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>WanderStay — a hotel search project built with React.</p>
        <p className="site-footer__meta">
          Hotel data via demohotelsapi.pythonanywhere.com
        </p>
      </div>
    </footer>
  );
}