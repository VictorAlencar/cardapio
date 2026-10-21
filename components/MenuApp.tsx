"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { CATEGORIES, MENU_ITEMS, formatPrice, type Category, type MenuItem } from "@/lib/menu";

type CartItem = MenuItem & { quantity: number };
type Toast = { id: number; message: string };

export default function MenuApp({ hero }: { hero: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleCart = () => setCartOpen((open) => !open);

  function showToast(message: string) {
    const id = ++toastId.current;
    setToasts((current) => [...current, { id, message }]);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3000);
  }

  function addToCart(item: MenuItem) {
    setCart((current) => {
      const existing = current.find((c) => c.id === item.id);
      if (existing) {
        return current.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...current, { ...item, quantity: 1 }];
    });
    showToast(`⚔️ ${item.name} adicionado à comanda!`);
  }

  function updateQuantity(itemId: string, delta: number) {
    setCart((current) =>
      current
        .map((c) => (c.id === itemId ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  }

  function handleWhatsAppCheckout() {
    if (cart.length === 0) {
      alert("Sua comanda está vazia! Adicione itens antes de finalizar.");
      return;
    }

    const trimmedNotes = notes.trim();
    let message = `🍗 *PEDIDO TAVERNA - LORD OF THE CHICKENS* 🍗\n`;
    message += `_"Um anel para governá-los... um frango para conquistá-los"_\n\n`;
    message += `📜 *ITENS DA COMANDA:*\n`;

    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
    });

    message += `\n💰 *TOTAL DO PEDIDO:* ${formatPrice(subtotal)}\n`;

    if (trimmedNotes) {
      message += `\n📝 *OBSERVAÇÕES:* ${trimmedNotes}\n`;
    }

    message += `\n📍 *INSTAGRAM:* @lordofthechickens\n`;
    message += `💳 *PAGAMENTO:* Na entrega (Pix/Cartão/VR)`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <>
      {/* Top Sticky Navigation */}
      <header className="top-bar">
        <div className="container nav-wrapper">
          <div className="brand-logo">
            <div className="ring-icon">💍</div>
            <div className="brand-info">
              <h1>Lord of the Chickens</h1>
              <p>Taverna de Frango Crocante</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="status-badge">
              <span className="dot"></span>
              <span>Taverna Aberta</span>
            </div>

            <button className="cart-btn-trigger" onClick={toggleCart} aria-label="Abrir Comanda">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Comanda</span>
              <span className="cart-badge">{totalItems}</span>
            </button>
          </div>
        </div>
      </header>

      {hero}

      {/* Controls: Live Search & Category Filter Tabs */}
      <section className="menu-controls">
        <div className="container controls-wrapper">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar banquetes, combos ou porções da taverna..."
              aria-label="Buscar pratos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`tab-btn${activeCategory === category.id ? " active" : ""}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid Section */}
      <main className="container menu-section">
        <div className="section-header">
          <h2 className="section-title">O Cardápio Épico</h2>
          <span className="section-subtitle">Preparados com ingredientes nobres no forno da cozinha</span>
        </div>

        <div className="dishes-grid">
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem 1rem", color: "var(--color-pecego-muted)" }}>
              <p style={{ fontSize: "1.2rem", fontFamily: "var(--font-heading)", marginBottom: "0.5rem" }}>
                Nenhum banquete encontrado no Oráculo!
              </p>
              <p style={{ fontSize: "0.9rem" }}>Tente buscar por outro ingrediente ou escolha outra categoria.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div className="dish-card" key={item.id}>
                <div className="dish-img-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="dish-img" loading="lazy" />
                  {item.badge && <span className={`dish-badge ${item.badge.type}`}>{item.badge.text}</span>}
                </div>
                <div className="dish-body">
                  <div className="dish-header">
                    <h3 className="dish-name">{item.name}</h3>
                    <span className="dish-price">{formatPrice(item.price)}</span>
                  </div>
                  <p className="dish-desc">{item.description}</p>
                  <div className="dish-footer">
                    <button className="add-cart-btn" onClick={() => addToCart(item)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Adicionar à Comanda
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Cart Drawer Overlay */}
      <div
        className={`cart-overlay${cartOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) toggleCart();
        }}
      >
        <aside className="cart-drawer">
          <div className="drawer-header">
            <h2 className="drawer-title font-heading">
              <span>📜</span> Comanda da Taverna
            </h2>
            <button className="close-drawer-btn" onClick={toggleCart} aria-label="Fechar Comanda">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="drawer-body">
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "#FFF", marginBottom: 4 }}>
                  Sua comanda está vazia
                </p>
                <p style={{ fontSize: "0.85rem" }}>
                  Escolha seus pratos para iniciar a jornada gastronômica pela Terra Média!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>
                  </div>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="drawer-footer">
            <div className="order-notes">
              <label htmlFor="orderNotes">Observações para o Cozinheiro (Opcional):</label>
              <textarea
                id="orderNotes"
                placeholder="Ex: Sem molho picante, sachês extras..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Taxa de Entrega (Terra Média)</span>
              <span style={{ color: "var(--color-turquesa)", fontWeight: 700 }}>Grátis</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button className="whatsapp-checkout-btn" onClick={handleWhatsAppCheckout}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              Enviar Pedido via WhatsApp
            </button>
          </div>
        </aside>
      </div>

      {/* Floating Mobile Cart Bar */}
      <div className="floating-mobile-bar" onClick={toggleCart}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>🛒 Comanda</span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "2px 10px", borderRadius: 12, fontSize: "0.85rem" }}>
            {totalItems} {totalItems === 1 ? "item" : "itens"}
          </span>
        </div>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div className="toast" key={toast.id}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-amarelo)" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}
