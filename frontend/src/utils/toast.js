/**
 * Professional Toast Notification Utility
 * Matches UniSubmit Premium Design
 */

export const showToast = (message, type = 'success') => {
  // 1. Create or get the toast container
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // 2. Create the toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;
  
  const icon = type === 'success' ? '✓' : '✕';
  const title = type === 'success' ? 'Success' : 'Error';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  // 3. Add to container
  container.appendChild(toast);

  // 4. Automatic removal with animation
  const removeTimeout = setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.4s ease-in forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
      // Remove container if empty
      if (container.childNodes.length === 0) {
        container.remove();
      }
    }, 400);
  }, 4000);

  // Allow manual dismissal on click
  toast.onclick = () => {
    clearTimeout(removeTimeout);
    toast.style.animation = 'toastSlideOut 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  };
};
