import { useState } from 'react';
import { Guitar, CartItem } from './types';
import { GuitarCard } from './Components/Card/Card';
import { Cart } from './Components/Korzina/korzina';

const MOCK_GUITARS: Guitar[] = [
  { id: 1, name: 'Fender Stratocaster', brand: 'Fender', type: 'electric', price: 120000, image: 'https://unsplash.com', description: 'Классическая электрогитара.' },
  { id: 2, name: 'Gibson Les Paul', brand: 'Gibson', type: 'electric', price: 180000, image: 'https://unsplash.com', description: 'Плотный, жирный звук.' },
  { id: 3, name: 'Yamaha F310', brand: 'Yamaha', type: 'acoustic', price: 18000, image: 'https://unsplash.com', description: 'Идеальная акустика для новичков.' },
  { id: 4, name: 'Ibanez Soundgear', brand: 'Ibanez', type: 'bass', price: 45000, image: 'https://unsplash.com', description: 'Удобный четырехструнный бас.' }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleAddToCart = (guitar: Guitar) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.guitar.id === guitar.id);
      if (existing) {
        return prevCart.map((item) =>
          item.guitar.id === guitar.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { guitar, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.guitar.id !== id));
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.guitar.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  // Фильтрация товаров
  const filteredGuitars = selectedType === 'all' 
    ? MOCK_GUITARS 
    : MOCK_GUITARS.filter(g => g.type === selectedType);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '20px', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>МАГАзин гитар</h1>
        <div>
          <button onClick={() => setSelectedType('all')} style={{ marginRight: '5px' }}>Все</button>
          <button onClick={() => setSelectedType('acoustic')} style={{ marginRight: '5px' }}>Акустические</button>
          <button onClick={() => setSelectedType('electric')} style={{ marginRight: '5px' }}>Электро</button>
          <button onClick={() => setSelectedType('bass')}>Басгитары</button>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '30px', marginTop: '20px' }}>
        <div>
          <h2>Каталог</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {filteredGuitars.map((guitar) => (
              <GuitarCard 
                key={guitar.id} 
                guitar={guitar} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        </div>

        <aside>
          <Cart 
            items={cart} 
            onRemove={handleRemoveFromCart} 
            onUpdateQuantity={handleUpdateQuantity} 
          />
        </aside>
      </main>
    </div>
  );
}