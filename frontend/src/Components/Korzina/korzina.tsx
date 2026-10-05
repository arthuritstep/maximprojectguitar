import { CartItem } from '../../types';

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity }) => {
  const totalPrice = items.reduce((sum, item) => sum + item.guitar.price * item.quantity, 0);

  return (
<div className="cart-container" style={{ backgroundColor: '#ff9900', color: '#000000', padding: '20px', borderRadius: '12px' }}>
  <h2 style={{ color: '#000000', margin: '0 0 15px 0', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '10px' }}>Корзина</h2>
      {items.length === 0 ? (
        <p style={{ color: '#666666' }}>Корзина пуста</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.map((item) => (
              <div key={item.guitar.id} className="cart-item" style={{ borderColor: '#ddd' }}>
                <div>
                  <h4 style={{ color: '#000000', margin: '0 0 5px 0' }}>{item.guitar.name}</h4>
                  <p style={{ color: '#333333', margin: 0 }}>
                    {item.guitar.price.toLocaleString()} Тенге x {item.quantity}
                  </p>
                </div>
                <div className="cart-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => onUpdateQuantity(item.guitar.id, -1)} disabled={item.quantity <= 1}>-</button>
                  <span style={{ color: '#000000', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.guitar.id, 1)}>+</button>
                  <button onClick={() => onRemove(item.guitar.id)} className="remove-btn">Удалить</button>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: '20px', textAlign: 'right', color: '#000000' }}>
            Итого: {totalPrice.toLocaleString()} Тенге
          </h3>
        </>
      )}
    </div>
  );
};