export function initChatWidget() {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'adonix-chat-widget';
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.bottom = '20px';
  widgetContainer.style.right = '20px';
  widgetContainer.style.zIndex = '999999';
  widgetContainer.style.display = 'flex';
  widgetContainer.style.flexDirection = 'column';
  widgetContainer.style.alignItems = 'flex-end';

  const iframeContainer = document.createElement('div');
  iframeContainer.id = 'adonix-chat-iframe-container';
  iframeContainer.style.display = 'none';
  // Responsive sizing for mobile
  iframeContainer.style.width = window.innerWidth < 400 ? 'calc(100vw - 40px)' : '350px';
  iframeContainer.style.height = window.innerHeight < 700 ? 'calc(100vh - 120px)' : '600px';
  iframeContainer.style.boxShadow = '0 10px 40px rgba(0,0,0,0.6)';
  iframeContainer.style.borderRadius = '20px';
  iframeContainer.style.overflow = 'hidden';
  iframeContainer.style.marginBottom = '20px';
  iframeContainer.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
  iframeContainer.style.opacity = '0';
  iframeContainer.style.transform = 'translateY(20px) scale(0.95)';
  iframeContainer.style.transformOrigin = 'bottom right';
  iframeContainer.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  iframeContainer.style.backgroundColor = '#0a0a0a';

  const iframe = document.createElement('iframe');
  iframe.src = 'https://studio.adonixai.cloud/webhook/5d7d5d5f-c65e-46ec-b0c9-92eb35a12f38/chat';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  iframeContainer.appendChild(iframe);

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'adonix-chat-toggle';
  toggleBtn.style.width = '65px';
  toggleBtn.style.height = '65px';
  toggleBtn.style.borderRadius = '50%';
  toggleBtn.style.backgroundColor = '#facc15'; // Adonix gold
  toggleBtn.style.border = 'none';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.boxShadow = '0 8px 25px rgba(250, 204, 21, 0.4)';
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.transition = 'transform 0.3s ease, background-color 0.3s ease';

  // SVG Icon for chat
  const chatIcon = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  const closeIcon = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  toggleBtn.innerHTML = chatIcon;

  // Hover effects
  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.transform = 'scale(1.05)';
  });
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.transform = 'scale(1)';
  });

  let isOpen = false;
  toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      iframeContainer.style.display = 'block';
      toggleBtn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        iframeContainer.style.opacity = '1';
        iframeContainer.style.transform = 'translateY(0) scale(1)';
        toggleBtn.style.transform = 'scale(1)';
      }, 10);
      toggleBtn.innerHTML = closeIcon;
    } else {
      iframeContainer.style.opacity = '0';
      iframeContainer.style.transform = 'translateY(20px) scale(0.95)';
      toggleBtn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        iframeContainer.style.display = 'none';
        toggleBtn.style.transform = 'scale(1)';
      }, 300);
      toggleBtn.innerHTML = chatIcon;
    }
  });

  // Handle window resize for mobile
  window.addEventListener('resize', () => {
    iframeContainer.style.width = window.innerWidth < 400 ? 'calc(100vw - 40px)' : '350px';
    iframeContainer.style.height = window.innerHeight < 700 ? 'calc(100vh - 120px)' : '600px';
  });

  widgetContainer.appendChild(iframeContainer);
  widgetContainer.appendChild(toggleBtn);
  document.body.appendChild(widgetContainer);
}
