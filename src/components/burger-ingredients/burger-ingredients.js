import React from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types.js";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsOfType from '../ingredients-of-type/ingredients-of-type.js';
import styles from './burger-ingredients.module.css'

function BurgerIngredients(props) {

  const { data, onClick } = props;

  const buns = data.filter(item => item.type === 'bun');
  const mains = data.filter(item => item.type === 'main');
  const sauces = data.filter(item => item.type === 'sauce');

  const [state, setState] = React.useState('buns');

  const handleClickTab = (val) => {
    setState(val);
  }

  return (
    <section className={styles.ingredients}>
      <ul className={styles.tabs}>
        <li><a href='#buns' className={styles.link}><Tab active={state === 'buns'} onClick={() => handleClickTab('buns')}>Булки</Tab></a></li>
        <li><a href='#sauces' className={styles.link}><Tab active={state === 'sauces'} onClick={() => handleClickTab('sauces')}>Соусы</Tab></a></li>
        <li><a href='#mains' className={styles.link}><Tab active={state === 'mains'} onClick={() => handleClickTab('mains')}>Начинки</Tab></a></li>
      </ul>
      <ul className={`${styles.blocks} mt-10`}>
        <li id="buns"><IngredientsOfType heading='Булки' items={buns} onClick={onClick} /></li>
        <li id="sauces"><IngredientsOfType heading='Соусы' items={sauces} onClick={onClick} /></li>
        <li id="mains"><IngredientsOfType heading='Начинки' items={mains} onClick={onClick} /></li>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired
}

export default BurgerIngredients;
