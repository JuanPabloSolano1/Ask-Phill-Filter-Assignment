import style from '../../styles/ProductCard.module.css';

export const ProductCard = ({ label, prices, image }) => {
  const backgroundStyle = {
    backgroundImage: `url(${image})`
  }

  return (
    <div className={style.card}>
      <div className={style.image} style={backgroundStyle}></div>
      <div className={style.footer}>
        <p className={style.label}>{label}</p>
        <p className={style.price}>
          { prices.map(price => `€ ${price}`).join(', ') }
        </p>
      </div>
    </div>
  );
};

export const ProductCards = ({ items }) => {
  return (
    <div className={style.cards} >
      {
        items.map((item, index) => <ProductCard key={index} {...item}  />)
      }
    </div>
  )
}