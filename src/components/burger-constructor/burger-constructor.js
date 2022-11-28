import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { data, getRandomBun, getRandomFood } from '../../utils/data.js';

function BurgerConstructor() {

  const randomBun = getRandomBun(data);
  const randomFood = getRandomFood(data, 6);
  const priceBurger = randomFood.reduce((acc, item) => acc + item.price, 0) + randomBun.price * 2;

  return (
    <section className={styles.burger}>
      <ul className={`${styles.burger__list} ml-4`}>
        <li className={`${styles.burger__item} mb-4 pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${randomBun.name} (верх)`}
            price={randomBun.price}
            thumbnail={randomBun.image}
          />
        </li>
        <li>
          <ul className={`${styles.burger__list} ${styles.burger__sublist}`}>
            {randomFood.map((elem, index) => (
              <li className={`${styles.burger__item} mb-4 pr-2`} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={elem.name}
                  price={elem.price}
                  thumbnail={elem.image_mobile}
                />
              </li>
            ))}
          </ul>
        </li>
        <li className={`${styles.burger__item} mb-10 mt-4 pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${randomBun.name} (низ)`}
            price={randomBun.price}
            thumbnail={randomBun.image}
          />
        </li>
      </ul>
      <div className={`${styles.burger__container} mr-4`}>
        <div className={`${styles.burger__wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{priceBurger}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;
