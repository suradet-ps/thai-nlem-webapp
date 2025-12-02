<template>
  <header class="header">
    <h1 class="title" data-text="Thai NLEM Drug">Thai NLEM Drug</h1>
    <p class="subtitle">ค้นหายาจากบัญชียาหลักแห่งชาติ</p>
  </header>
</template>

<style scoped>
  .header {
    text-align: center;
    padding-bottom: var(--spacing-8);
  }

  .title {
    position: relative;
    font-family: var(--font-mono);
    color: var(--color-primary);
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow:
      0 0 10px rgba(0, 242, 234, 0.4),
      0 0 20px rgba(0, 242, 234, 0.2);
    margin: 0;
    letter-spacing: 0.05em;
    animation: text-flicker 4s linear infinite;
  }

  .subtitle {
    color: var(--color-text-secondary);
    margin: 0;
    margin-top: var(--spacing-2);
  }

  .title::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: var(--color-primary);
    text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
    clip-path: inset(0 0 0 0);
    animation: glitch 3s infinite;
  }

  @keyframes text-flicker {
    0% {
      opacity: 0.8;
    }
    5% {
      opacity: 0.6;
    }
    10% {
      opacity: 0.9;
    }
    15% {
      opacity: 0.5;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes glitch {
    0% {
      clip-path: inset(45% 0 50% 0);
    }
    5% {
      clip-path: inset(60% 0 10% 0);
    }
    10% {
      clip-path: inset(90% 0 5% 0);
    }
    15% {
      clip-path: inset(30% 0 65% 0);
    }
    20% {
      clip-path: inset(55% 0 20% 0);
    }
    25% {
      clip-path: inset(0 0 0 0);
    }
    100% {
      clip-path: inset(0 0 0 0);
    }
  }

  @media (max-width: 640px) {
    .header {
      padding-bottom: var(--spacing-6);
    }
    .title {
      font-size: 1.8rem;
      letter-spacing: normal;
    }
    .subtitle {
      font-size: 0.9rem;
    }
  }
</style>
