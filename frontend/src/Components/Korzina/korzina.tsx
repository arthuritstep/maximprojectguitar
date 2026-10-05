import { CartItem } from '../../types';

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity }) => {
  const totalPrice = items.reduce((sum, item) => sum + item.guitar.price * item.quantity, 0);

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Корзина</h2>
      {items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.map((item) => (
              <div key={item.guitar.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <div>
                  <h4>{item.guitar.name}</h4>
                  <p>{item.guitar.price} Тенге x {item.quantity}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => onUpdateQuantity(item.guitar.id, -1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.guitar.id, 1)}>+</button>
                  <button onClick={() => onRemove(item.guitar.id)} style={{ color: 'red', marginLeft: '10px' }}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: '20px', textAlign: 'right' }}>Итого: {totalPrice} Тенге</h3>
        </>
      )}
    </div>
  );
};