const products = [
  {
    name: "Maiô Aura",
    category: "Essenciais",
    price: "R$ 389",
    installments: "ou 4x de R$ 97,25",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=88",
    tone: "Areia",
  },
  {
    name: "Biquíni Sole",
    category: "Alba 26",
    price: "R$ 329",
    installments: "ou 4x de R$ 82,25",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=88",
    tone: "Terracota",
  },
  {
    name: "Saída Lume",
    category: "Resort",
    price: "R$ 449",
    installments: "ou 4x de R$ 112,25",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=88",
    tone: "Natural",
  },
  {
    name: "Pareô Brisa",
    category: "Resort",
    price: "R$ 279",
    installments: "ou 4x de R$ 69,75",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=88",
    tone: "Cacau",
  },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span>Frete grátis acima de R$ 700</span>
        <span className="announcement-detail">Primeira troca grátis · até 4x sem juros</span>
      </div>

      <header className="site-header">
        <details className="menu-shell">
          <summary className="icon-button menu-button" aria-label="Abrir menu">
            <i />
            <i />
          </summary>
          <nav className="menu-panel" aria-label="Menu principal">
            <div className="menu-topline">
              <span>Menu</span>
              <span className="menu-close">Fechar ×</span>
            </div>
            <a href="#new">Novidades <span>01</span></a>
            <a href="#collections">Beachwear <span>02</span></a>
            <a href="#resort">Resortwear <span>03</span></a>
            <a href="#story">Nossa história <span>04</span></a>
            <a href="#contact">Contato <span>05</span></a>
            <p>Feito à mão no Brasil, para acompanhar verões que ficam na memória.</p>
          </nav>
        </details>

        <a className="brand" href="#top" aria-label="Vieste — início">
          <strong>VIESTE</strong>
          <small>CONCETTO</small>
        </a>

        <nav className="header-actions" aria-label="Ações">
          <a href="#new" className="search-link">Buscar</a>
          <a href="#contact" className="account-link">Conta</a>
          <details className="cart-shell">
            <summary aria-label="Abrir sacola">Sacola <b>0</b></summary>
            <div className="cart-panel">
              <span>Sua sacola</span>
              <strong>Ainda há espaço para o verão.</strong>
              <p>Descubra peças feitas para combinar entre si.</p>
              <a href="#new">Explorar novidades</a>
            </div>
          </details>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2200&q=92"
          alt="Mar em movimento ao entardecer"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p>Alba · verão 2026</p>
          <h1 id="hero-title">O verão<br />começa por dentro.</h1>
          <a className="light-link" href="#new">Conheça a coleção <Arrow /></a>
        </div>
        <div className="hero-index"><span>01</span><i /><span>03</span></div>
        <p className="hero-side-note">Vieste pelo sol. Ficou pela sensação.</p>
      </section>

      <section className="manifesto" aria-label="Manifesto da marca">
        <p className="eyebrow">Vieste Concetto · Belo Horizonte</p>
        <h2>Para vestir a pele,<br /><em>o tempo</em> e a liberdade.</h2>
        <p className="manifesto-copy">
          Formas que valorizam o corpo com naturalidade. Texturas que atravessam a praia,
          a cidade e todos os lugares onde você escolhe estar.
        </p>
      </section>

      <section className="collections" id="collections" aria-labelledby="collections-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Escolha seu horizonte</p>
            <h2 id="collections-title">Coleções</h2>
          </div>
          <a href="#new">Ver todas <Arrow /></a>
        </div>

        <div className="collection-grid">
          <article className="collection-card large">
            <img
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=90"
              alt="Praia de águas claras"
            />
            <a href="#new"><span><small>01</small> Beachwear</span><Arrow /></a>
          </article>
          <article className="collection-card" id="resort">
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=90"
              alt="Piscina de resort entre palmeiras"
            />
            <a href="#new"><span><small>02</small> Resortwear</span><Arrow /></a>
          </article>
        </div>
      </section>

      <section className="new-arrivals" id="new" aria-labelledby="new-title">
        <div className="section-heading product-heading">
          <div>
            <p className="eyebrow">Acabou de chegar</p>
            <h2 id="new-title">Novidades</h2>
          </div>
          <p>Peças leves. Presença inteira.</p>
        </div>

        <div className="product-row">
          {products.map((product, index) => (
            <article className="product-card" key={product.name}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="product-number">0{index + 1}</span>
                <button aria-label={`Adicionar ${product.name} aos favoritos`}>♡</button>
                <a href="#contact">Ver peça</a>
              </div>
              <div className="product-meta">
                <div>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <small>{product.tone}</small>
                </div>
                <div className="price">
                  <strong>{product.price}</strong>
                  <small>{product.installments}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="story-title">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=90"
            alt="Textura de ondas suaves no mar"
          />
          <span>Desde 2019</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">Nossa história</p>
          <h2 id="story-title">Um jeito mineiro<br />de olhar para o mar.</h2>
          <p>
            A Vieste nasceu do desejo de criar moda praia com permanência: modelagens
            precisas, matéria-prima escolhida com cuidado e uma feminilidade que não pede licença.
          </p>
          <blockquote>“Menos pressa, mais presença.”</blockquote>
          <a className="dark-link" href="#contact">Conheça a Vieste <Arrow /></a>
        </div>
      </section>

      <section className="editorial" aria-label="Editorial">
        <img
          src="https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=2200&q=90"
          alt="Sombras de palmeiras em uma parede clara"
        />
        <div>
          <p>Diário de verão · 01</p>
          <h2>Entre a sombra<br />e o sal.</h2>
          <a href="#new">Ver editorial <Arrow /></a>
        </div>
      </section>

      <section className="newsletter" id="contact">
        <div>
          <p className="eyebrow">Cartas de verão</p>
          <h2>Novidades chegam primeiro aqui.</h2>
        </div>
        <form>
          <label htmlFor="email">Seu melhor e-mail</label>
          <div className="email-field">
            <input id="email" type="email" placeholder="nome@email.com" />
            <button type="submit" aria-label="Cadastrar e-mail">→</button>
          </div>
          <small>Ao se cadastrar, você concorda com nossa política de privacidade.</small>
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <a className="footer-brand" href="#top">VIESTE</a>
          <div>
            <p>Atendimento</p>
            <a href="mailto:oi@viesteconcetto.com.br">oi@viesteconcetto.com.br</a>
            <a href="#contact">WhatsApp</a>
            <a href="#contact">Fale conosco</a>
          </div>
          <div>
            <p>Informações</p>
            <a href="#contact">Trocas e devoluções</a>
            <a href="#contact">Envios e entregas</a>
            <a href="#contact">Guia de medidas</a>
          </div>
          <div>
            <p>Siga a Vieste</p>
            <a href="#contact">Instagram ↗</a>
            <a href="#contact">Pinterest ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Vieste Concetto</span>
          <span>Feito no Brasil</span>
          <a href="#top">Voltar ao topo ↑</a>
        </div>
      </footer>
    </main>
  );
}
