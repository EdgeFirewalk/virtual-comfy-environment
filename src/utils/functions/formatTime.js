const formatTime = (totalSeconds) => {
  // Вычисляем количество минут и секунд
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;

  // Форматируем строку в виде "мм:сс"
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};

export default formatTime;
