import React from 'react';
import styles from './Button.module.css';

const Button = ({ className, icon, text, children, ...props }) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {/* Иконка, если она передана */}
      {icon && <span className={styles.icon}>{icon}</span>}

      {/* Текст, если он передан */}
      {text && <span className={styles.text}>{text}</span>}

      {/* Дочерние элементы, если они переданы */}
      {children}
    </button>
  );
};

export default Button;
