import React, { FC, useRef } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsOfType from '../ingredients-of-type/ingredients-of-type';
import styles from './burger-ingredients.module.css'

interface IBurgerIngrProps {
  toClick: (arg: boolean) => void;
}

const BurgerIngredients: FC<IBurgerIngrProps> = ({ toClick }) => {

  const handleClickIngredient = () => {
    toClick(true)
  };

  const { data } = useSelector(store => ({
    data: store.ingredients.ingredientsList
  }));

  const buns = data.filter(item => item.type === 'bun');
  const mains = data.filter(item => item.type === 'main');
  const sauces = data.filter(item => item.type === 'sauce');

  const [activeTab, setActiveTab] = React.useState('buns');
  const handleClickTab = (val: string) => {
    setActiveTab(val);
  }

  const scrollRef = useRef<HTMLUListElement>(null);
  const bunsRef = useRef<HTMLLIElement>(null);
  const saucesRef = useRef<HTMLLIElement>(null);
  const mainsRef = useRef<HTMLLIElement>(null);

  const handleScroll = () => {
    const startingPoint = scrollRef.current!.getBoundingClientRect().top;
    const bunsPoint = bunsRef.current!.getBoundingClientRect().top;
    const saucesPoint = saucesRef.current!.getBoundingClientRect().top;
    const mainsPoint = mainsRef.current!.getBoundingClientRect().top;

    const bunsShift = Math.abs(startingPoint - bunsPoint);
    const saucesShift = Math.abs(startingPoint - saucesPoint);
    const mainsShift = Math.abs(startingPoint - mainsPoint);

    const closest = Math.min(bunsShift, saucesShift, mainsShift);

    if (closest === bunsShift) {
      setActiveTab('buns');
    }
    else {
      if (closest === saucesShift) {
        setActiveTab('sauces');
      }
      else {
        setActiveTab('mains');
      }
    }
  };

  return (
    <section className={styles.ingredients} >
      <ul className={styles.tabs}>
        <li><a href='#buns' className={styles.link}><Tab active={activeTab === 'buns'} value="Булки" onClick={() => handleClickTab('buns')}>Булки</Tab></a></li>
        <li><a href='#sauces' className={styles.link}><Tab active={activeTab === 'sauces'} value="Соусы" onClick={() => handleClickTab('sauces')}>Соусы</Tab></a></li>
        <li><a href='#mains' className={styles.link}><Tab active={activeTab === 'mains'} value="Начинки" onClick={() => handleClickTab('mains')}>Начинки</Tab></a></li>
      </ul>
      <ul className={`${styles.blocks} mt-10`} ref={scrollRef} onScroll={handleScroll}>
        <li id="buns" ref={bunsRef}><IngredientsOfType heading='Булки' items={buns} onClick={handleClickIngredient} /></li>
        <li id="sauces" ref={saucesRef}><IngredientsOfType heading='Соусы' items={sauces} onClick={handleClickIngredient} /></li>
        <li id="mains" ref={mainsRef}><IngredientsOfType heading='Начинки' items={mains} onClick={handleClickIngredient} /></li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;
