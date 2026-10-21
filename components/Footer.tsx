export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <h3 className="font-heading">📍 Taverna Lord of the Chickens</h3>
          <p>Delivery rápido e seguro por toda a Terra Média.</p>
          <p>
            📱 Instagram: <strong>@lordofthechickens</strong>
          </p>
        </div>
        <div className="footer-col">
          <h3 className="font-heading">💳 Formas de Pagamento</h3>
          <p>Aceitamos todas as formas de pagamento:</p>
          <div className="payments-list">
            <span className="payment-badge">Pix Instantâneo</span>
            <span className="payment-badge">Cartão de Crédito</span>
            <span className="payment-badge">Cartão de Débito</span>
            <span className="payment-badge">VR / Alelo / Sodexo</span>
          </div>
        </div>
        <div className="footer-col">
          <h3 className="font-heading">⏰ Horário de Funcionamento</h3>
          <p>Segunda a Domingo: 18:00 às 23:30</p>
          <p>Abertos em feriados e dias de batalha!</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2026 Lord of the Chickens. Todos os direitos reservados. &quot;Um frango para
          conquistá-los&quot;.
        </p>
      </div>
    </footer>
  );
}
