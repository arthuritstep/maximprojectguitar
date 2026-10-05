import { Guitar } from '../../types';

interface GuitarCardProps {
  guitar: Guitar;
  onAddToCart: (guitar: Guitar) => void;
}

export const GuitarCard: React.FC<GuitarCardProps> = ({ guitar, onAddToCart }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
      <img src={guitar.image} alt={guitar.name} style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
      <h3>{guitar.name}</h3>
      <p style={{ color: '#666' }}>{guitar.brand} | {guitar.type}</p>
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{guitar.price} ₽</p>
      <button 
        onClick={() => onAddToCart(guitar)}
        style={{ backgroundColor: '#ff9900', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
      >
        Добавить в корзину
      </button>
    </div>
  );
};