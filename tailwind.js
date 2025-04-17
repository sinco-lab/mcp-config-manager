// tailwind.js - Simplified TailwindCSS configuration
window.tailwind = {
  config: {
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6',
          secondary: '#6366F1',
          dark: '#111827',
          accent: '#10B981'
        }
      }
    }
  }
};

// Basic TailwindCSS class definitions
(function() {
  const style = document.createElement('style');
  style.textContent = `
    /* Basic Colors */
    .text-white { color: #fff; }
    .text-gray-100 { color: #f3f4f6; }
    .text-gray-300 { color: #d1d5db; }
    .text-gray-400 { color: #9ca3af; }
    .text-gray-500 { color: #6b7280; }
    .text-gray-700 { color: #374151; }
    .text-blue-400 { color: #60a5fa; }
    .text-green-500 { color: #10b981; }
    .text-green-600 { color: #059669; }
    .text-red-400 { color: #f87171; }
    .text-red-500 { color: #ef4444; }
    .text-yellow-400 { color: #fbbf24; }
    
    /* Custom Colors */
    .text-primary { color: #3B82F6; }
    .text-secondary { color: #6366F1; }
    .text-dark { color: #111827; }
    .text-accent { color: #10B981; }
    .bg-primary { background-color: #3B82F6; }
    .bg-secondary { background-color: #6366F1; }
    .bg-dark { background-color: #111827; }
    .bg-accent { background-color: #10B981; }
    .hover\:bg-blue-600:hover { background-color: #2563eb; }
    .hover\:bg-green-600:hover { background-color: #059669; }
    .hover\:bg-red-900:hover { background-color: #7f1d1d; }
    .hover\:bg-blue-900:hover { background-color: #1e3a8a; }
    .hover\:text-blue-400:hover { color: #60a5fa; }
    .hover\:text-red-400:hover { color: #f87171; }
    
    /* Background Colors */
    .bg-\[\#0F172A\] { background-color: #0F172A; }
    .bg-\[\#1E293B\] { background-color: #1E293B; }
    .bg-\[\#111827\] { background-color: #111827; }
    .bg-\[\#334155\] { background-color: #334155; }
    .bg-\[\#475569\] { background-color: #475569; }
    .bg-\[\#1a1f35\] { background-color: #1a1f35; }
    .bg-\[\#1a2234\] { background-color: #1a2234; }
    .hover\:bg-\[\#334155\]:hover { background-color: #334155; }
    .hover\:bg-\[\#475569\]:hover { background-color: #475569; }
    
    /* Borders */
    .border { border-width: 1px; }
    .border-t { border-top-width: 1px; }
    .border-gray-700 { border-color: #374151; }
    .focus\:border-transparent:focus { border-color: transparent; }
    
    /* Sizing and Spacing */
    .w-full { width: 100%; }
    .max-w-md { max-width: 28rem; }
    .h-1 { height: 0.25rem; }
    .h-5 { height: 1.25rem; }
    .h-6 { height: 1.5rem; }
    .h-9 { height: 2.25rem; }
    .h-10 { height: 2.5rem; }
    .h-40 { height: 10rem; }
    .min-h-screen { min-height: 100vh; }
    .w-9 { width: 2.25rem; }
    .w-10 { width: 2.5rem; }
    .w-11 { width: 2.75rem; }
    .w-48 { width: 12rem; }
    
    /* Flex Layout */
    .flex { display: flex; }
    .hidden { display: none; }
    .flex-col { flex-direction: column; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .justify-end { justify-content: flex-end; }
    .items-center { align-items: center; }
    .flex-wrap { flex-wrap: wrap; }
    
    /* Margins & Padding */
    .p-0 { padding: 0; }
    .p-1 { padding: 0.25rem; }
    .p-4 { padding: 1rem; }
    .p-5 { padding: 1.25rem; }
    .p-6 { padding: 1.5rem; }
    .px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-2\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .pt-0 { padding-top: 0; }
    .pb-4 { padding-bottom: 1rem; }
    .m-0\.5 { margin: 0.125rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
    .mt-6 { margin-top: 1.5rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mr-1 { margin-right: 0.25rem; }
    .mr-2 { margin-right: 0.5rem; }
    .mr-3 { margin-right: 0.75rem; }
    .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .gap-2 { gap: 0.5rem; }
    .gap-3 { gap: 0.75rem; }
    .gap-4 { gap: 1rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    
    /* Rounded Corners */
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-xl { border-radius: 0.75rem; }
    .rounded-2xl { border-radius: 1rem; }
    .rounded-full { border-radius: 9999px; }
    
    /* Fonts */
    .font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .font-bold { font-weight: 700; }
    .font-medium { font-weight: 500; }
    .font-semibold { font-weight: 600; }
    .text-xs { font-size: 0.75rem; }
    .text-sm { font-size: 0.875rem; }
    .text-lg { font-size: 1.125rem; }
    .text-xl { font-size: 1.25rem; }
    .text-2xl { font-size: 1.5rem; }
    .text-center { text-align: center; }
    
    /* Effects */
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
    .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    .bg-opacity-80 { --tw-bg-opacity: 0.8; }
    .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
    .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
    .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
    .from-blue-400 { --tw-gradient-from: #60a5fa; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(96, 165, 250, 0)); }
    .from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); }
    .from-primary { --tw-gradient-from: #3B82F6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); }
    .to-indigo-300 { --tw-gradient-to: #a5b4fc; }
    .to-indigo-600 { --tw-gradient-to: #4f46e5; }
    .to-secondary { --tw-gradient-to: #6366F1; }
    .text-transparent { color: transparent; }
    
    /* Positioning */
    .fixed { position: fixed; }
    .absolute { position: absolute; }
    .relative { position: relative; }
    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
    .bottom-4 { bottom: 1rem; }
    .left-1\/2 { left: 50%; }
    .right-4 { right: 1rem; }
    .z-50 { z-index: 50; }
    
    /* Transformations */
    .transform { transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1); }
    .translate-y-10 { transform: translateY(2.5rem); }
    .-translate-x-1\/2 { transform: translateX(-50%); }
    .rotate-180 { transform: rotate(180deg); }
    .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .transition-colors { transition-property: background-color, border-color, color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .duration-300 { transition-duration: 300ms; }
    
    /* Other */
    .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    .focus\:ring-2:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
    .focus\:ring-primary:focus { --tw-ring-color: #3B82F6; }
    .cursor-pointer { cursor: pointer; }
    .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
    .opacity-0 { opacity: 0; }
    .peer:checked ~ .peer-checked\:after\:translate-x-full::after { transform: translateX(100%); }
    .after\:content-\[\'\'\'\]::after { content: ''; }
    .after\:absolute::after { position: absolute; }
    .after\:top-\[2px\]::after { top: 2px; }
    .after\:left-\[2px\]::after { left: 2px; }
    .after\:bg-white::after { background-color: #fff; }
    .after\:border::after { border-width: 1px; }
    .after\:border-gray-300::after { border-color: #d1d5db; }
    .after\:rounded-full::after { border-radius: 9999px; }
    .after\:h-5::after { height: 1.25rem; }
    .after\:w-5::after { width: 1.25rem; }
    .after\:transition-all::after { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    
    /* Media Queries */
    @media (min-width: 768px) {
      .md\:flex-row { flex-direction: row; }
    }
    
    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})(); 