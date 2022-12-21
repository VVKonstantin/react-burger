import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorContext, IngredientsContext } from '../../services/contexts.js';
import { getBun, getFoodContent } from '../../utils/data.js';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ onClick }) {

  const [totalPrice, setTotalPrice] = React.useState(0);

  const data = useContext(IngredientsContext);
  const { burgerIngredients, setBurgerIngredients } = useContext(BurgerConstructorContext);

  let bun = React.useMemo(() => getBun(data), [data]);
  let burgerContent = React.useMemo(() => getFoodContent(data), [data]);

  const calcTotalPrice = React.useCallback(() => {
    const price = burgerContent.reduce((acc, item) => acc += item.price, 0) + 2 * bun.reduce((acc, item) => acc += item.price, 0);
    setTotalPrice(price);
  }, [data, burgerIngredients]);

  React.useEffect(() => {
    setBurgerIngredients({
      bun: [...bun],
      burgerContent: [...burgerContent],
      price: totalPrice
    })
  }, [bun, burgerContent]);

  React.useEffect(() => {
    calcTotalPrice();
  }, [calcTotalPrice]);

  const handleClickOrder = () => {
    const ingredientIds = [];
    burgerIngredients.bun.forEach(elem => ingredientIds.push(elem._id));
    burgerIngredients.burgerContent.forEach(elem => ingredientIds.push(elem._id));

    onClick(ingredientIds);
  };

  return (
    <section className={styles.burger}>
      <ul className={`${styles.list} ml-4`}>
        <li className={`${styles.item} mb-4 pr-4`}>
          {burgerIngredients.bun.map((item) =>
            <ConstructorElement
              key={item._id}
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
            />
          )}
        </li>
        <li>
          <ul className={`${styles.list} ${styles.sublist}`}>
            {burgerIngredients.burgerContent.map((item) =>
              <li className={`${styles.item} mb-4 pr-2`} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </li>
            )}
          </ul>
        </li>
        <li className={`${styles.item} mb-10 mt-4 pr-4`}>
          {burgerIngredients.bun.map((item) =>
            <ConstructorElement
              key={item._id}
              type="bottom"
              isLocked={true}
              text={`${item.name} (низ)`}
              price={item.price}
              thumbnail={item.image}
            />
          )}
        </li>
      </ul>
      <div className={`${styles.container} mr-4`}>
        <div className={`${styles.wrapper} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => handleClickOrder()}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BurgerConstructor;
