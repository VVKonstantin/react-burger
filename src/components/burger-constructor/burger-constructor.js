import PropTypes from 'prop-types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getRandomBun, getRandomFood, data } from '../../utils/data.js';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ onClick }) {

  const randomBun = getRandomBun(data);
  const randomFood = getRandomFood(data, 6);
  const priceBurger = randomFood.reduce((acc, item) => acc + item.price, 0) + randomBun.price * 2;

  return (
    <section className={styles.burger}>
      <ul className={`${styles.list} ml-4`}>
        <li className={`${styles.item} mb-4 pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${randomBun.name} (верх)`}
            price={randomBun.price}
            thumbnail={randomBun.image}
          />
        </li>
        <li>
          <ul className={`${styles.list} ${styles.sublist}`}>
            {randomFood.map((elem, ind) => (
              <li className={`${styles.item} mb-4 pr-2`} key={ind}>
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
        <li className={`${styles.item} mb-10 mt-4 pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${randomBun.name} (низ)`}
            price={randomBun.price}
            thumbnail={randomBun.image}
          />
        </li>
      </ul>
      <div className={`${styles.container} mr-4`}>
        <div className={`${styles.wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{priceBurger}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => onClick()}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BurgerConstructor;
