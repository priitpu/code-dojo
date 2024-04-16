export const getRandomColor = () => {
  let colors = [
    '#DAF5F0',
    '#B5D2AD',
    '#FDFD96',
    '#F8D6B3',
    '#FCDFFF',
    '#E3DFF2',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
