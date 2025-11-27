// Load all data and render site
async function loadSite() {
  try {
    const [settings, navigation, hero, stats, featuredLoans, dpa, tools, agent, learningHub, app, stickyCta, footer] = await Promise.all([
      fetch('/_data/settings.json').then(r => r.json()),
      fetch('/_data/navigation.json').then(r => r.json()),
      fetch('/_data/hero.json').then(r => r.json()),
      fetch('/_data/stats.json').then(r => r.json()),
      fetch('/_data/featured-loans.json').then(r => r.json()),
      fetch('/_data/dpa.json').then(r => r.json()),
      fetch('/_data/tools.json').then(r => r.json()),
      fetch('/_data/agent.json').then(r => r.json()),
      fetch('/_data/learning-hub.json').then(r => r.json()),
      fetch('/_data/app.json').then(r => r.json()),
      fetch('/_data/sticky-cta.json').then(r => r.json()),
      fetch('/_data/footer.json').then(r => r.json())
    ]);

    // Load blog posts
    const blogs = await loadBlogs();

    renderSite({ settings, navigation, hero, stats, featuredLoans, dpa, tools, agent, learningHub, app, stickyCta, footer, blogs });
  } catch (err) {
    console.error('Error loading site data:', err);
    document.getElementById('site').innerHTML = '<p style="padding:50px;text-align:center">Error loading site. Please refresh.</p>';
  }
}

async function loadBlogs() {
  // For static site, we'll embed blog data or load from a blogs.json
  // This is a simplified version - in production you'd generate this during build
  try {
    const response = await fetch('/_data/blogs.json');
    return await response.json();
  } catch {
    // Return default blogs if file doesn't exist yet
    return [
      {
        slug: "fha-loan-eligibility-2025",
        title: "2025 FHA Loan Eligibility",
        excerpt: "FHA loan qualifications are pretty flexible, but for the best chance at approval, you should aim for a credit score of 620+.",
        image: "/images/fha-eligibility.jpg",
        readTime: "8 min read",
        authorName: "Shiloh Davis",
        authorTitle: "Loan Officer Development",
        authorImage: "/images/shiloh-davis.jpg"
      },
      {
        slug: "fha-vs-conventional-loans",
        title: "FHA vs. Conventional Loans: Which is Better?",
        excerpt: "Compare FHA and conventional loans to find the best fit for your budget, credit, and homeownership goals.",
        image: "/images/fhavsconv.jpg",
        readTime: "6 min read",
        authorName: "Crystal Shifflet",
        authorTitle: "Loan Coordinator",
        authorImage: "/images/crystal-shifflet.jpg"
      },
      {
        slug: "down-payment-assistance-programs",
        title: "Down Payment Assistance Programs for Your New Home",
        excerpt: "Explore down payment assistance programs that can make buying a home more affordable.",
        image: "/images/downpayment-assistance.jpg",
        readTime: "6 min read",
        authorName: "Tyler Oswald",
        authorTitle: "Production Training Team Lead",
        authorImage: "/images/tyler-oswald.jpg"
      }
    ];
  }
}

function renderSite(data) {
  const { settings, navigation, hero, stats, featuredLoans, dpa, tools, agent, learningHub, app, stickyCta, footer, blogs } = data;
  
  document.getElementById('site').innerHTML = `
    <div class="banner-legal">${settings.legalBanner}</div>
    
    <header class="site-header">
      <div class="header-container">
        <a href="/" class="logo"><img src="/images/png01.png" alt="${settings.siteName}"></a>
        <nav class="nav-primary">
          ${navigation.items.map(n => `<a href="${n.url}">${n.label}</a>`).join('')}
        </nav>
        <div class="nav-utility">
          <a href="tel:${settings.phone}" class="phone">${settings.phone}</a>
          <a href="/start" class="btn-apply">Apply</a>
          <a href="/login" class="btn-login">Log In</a>
        </div>
      </div>
    </header>

    <section class="hero">
      <div class="container">
        <div class="hero-reviews">
          <div class="hero-avatars">
            ${(hero.avatars || []).map(img => `<img src="${img}" alt="">`).join('')}
          </div>
          <div class="hero-rating">
            <div class="stars">★★★★★</div>
            <div><strong>${hero.ratingPercent}</strong> ${hero.ratingText}</div>
          </div>
        </div>
        <div class="hero-badge">${hero.badge}</div>
        <h1>${hero.title}<br><em>${hero.titleEmphasis}</em></h1>
        <a href="${hero.buttonUrl}" class="btn-hero">${hero.buttonText}</a>
        <p class="hero-subtext">${hero.subtext}</p>
      </div>
    </section>

    <section class="stats-bar">
      <div class="container">
        <div class="stats">
          ${stats.items.map(s => `<div class="stat"><span class="stat-number">${s.number}</span><span class="stat-label">${s.label}</span></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="featured-loans">
      <div class="container">
        <div class="section-header">
          <span class="badge">${featuredLoans.badge}</span>
          <h2>${featuredLoans.title} <em>${featuredLoans.titleEmphasis}</em></h2>
        </div>
        <div class="loans-grid">
          ${featuredLoans.loans.map(loan => `
            <div class="loan-card">
              <h3>${loan.title}</h3>
              <p>${loan.description}</p>
              <div class="loan-image">
                <img src="${loan.image}" alt="${loan.title}">
                ${loan.showDPA ? '<span class="dpa-badge">Down Payment Assistance Available</span>' : ''}
              </div>
              <ul>${(loan.features || []).map(f => `<li>${f}</li>`).join('')}</ul>
              <a href="/start" class="btn-outline">${loan.buttonText}</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="dpa-section">
      <div class="container">
        <div class="dpa-content">
          <div class="dpa-text">
            <h3>${dpa.title} <em>${dpa.titleEmphasis}</em>.</h3>
            <ul>${(dpa.features || []).map(f => `<li>${f}</li>`).join('')}</ul>
          </div>
          <div class="dpa-cta">
            <a href="/start" class="btn-shine">${dpa.buttonText}</a>
            <span>${dpa.buttonSubtext}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="tools-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">${tools.badge}</span>
          <h2>${tools.title} <em>${tools.titleEmphasis}</em></h2>
        </div>
        <div class="tools-grid">
          ${tools.items.map(t => `
            <a href="${t.url}" class="tool-card">
              <div class="tool-icon">🔧</div>
              <div><h4>${t.title}</h4><p>${t.description}</p></div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="agent-section">
      <div class="container">
        <div class="agent-content">
          <div class="agent-text">
            <h2>${agent.title}</h2>
            <p>${agent.description}</p>
            <a href="/start" class="btn-shine">${agent.buttonText}</a>
          </div>
          <div class="agent-image">
            <img src="${agent.image}" alt="Agent">
          </div>
        </div>
      </div>
    </section>

    <section class="articles-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">${learningHub.badge}</span>
          <h2>${learningHub.title} <em>${learningHub.titleEmphasis}</em></h2>
        </div>
        <div class="articles-grid">
          ${blogs.slice(0, 3).map(post => `
            <a href="/blog/${post.slug}" class="article-card">
              <img src="${post.image}" alt="${post.title}">
              <div class="article-body">
                <span class="read-time">${post.readTime}</span>
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
                <div class="byline">
                  <img src="${post.authorImage}" alt="${post.authorName}">
                  <div>
                    <strong>${post.authorName}</strong>
                    <span>${post.authorTitle}</span>
                  </div>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:30px">
          <a href="/blog" class="btn-outline-dark">${learningHub.viewAllText}</a>
        </div>
      </div>
    </section>

    <section class="app-section">
      <div class="container">
        <div class="app-content">
          <div class="app-text">
            <h2>${app.title} <em>${app.titleEmphasis}</em></h2>
            <ul>
              ${(app.features || []).map(f => `<li><strong>${f.title}</strong><span>${f.description}</span></li>`).join('')}
            </ul>
            <a href="/app" class="btn-shine">${app.buttonText}</a>
          </div>
          <div class="app-image">
            <img src="${app.image}" alt="App">
          </div>
        </div>
      </div>
    </section>

    <div class="sticky-cta">
      <span>${stickyCta.text}</span>
      <a href="/start" class="btn-shine">${stickyCta.buttonText}</a>
    </div>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-logo">
            <img src="/images/png01.png" alt="${settings.siteName}">
          </div>
          ${footer.columns.map(col => `
            <div class="footer-col">
              <h5>${col.title}</h5>
              <ul>${col.links.map(l => `<li><a href="${l.url}">${l.label}</a></li>`).join('')}</ul>
            </div>
          `).join('')}
        </div>
        <div class="footer-legal">${footer.legalText}</div>
      </div>
    </footer>
  `;
}

// Initialize
loadSite();
