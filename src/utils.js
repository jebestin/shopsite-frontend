// On Vercel, set REACT_APP_API_BASE to your Railway backend URL, e.g:
//   https://shopsite-backend-production.up.railway.app/api
// Locally, it automatically falls back to localhost — no manual edits needed.
export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

export const imgUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const root = API_BASE.replace(/\/api\/?$/, '');
  return `${root}${path}`;
};

export const whatsappUrl = (number, message) => {
  if (!number) return '#';
  const clean = number.replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message || 'Hi!')}`;
};
