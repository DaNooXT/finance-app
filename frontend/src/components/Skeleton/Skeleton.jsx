import styles from './Skeleton.module.css';

export default function Skeleton({ width = '100%', height = '16px', radius = '8px', className = '' }) {
  return (
    <span
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius: radius }}
    />
  );
}
