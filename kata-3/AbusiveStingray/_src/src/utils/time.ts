export const secondsToHMS = (initial: number) => {
  const hours = Math.floor(initial / 3600);
  const minutes = Math.floor((initial % 3600) / 60);
  const seconds = Math.floor(initial % 60);
  const strings = [
    hours > 0 ? `${hours}h ` : '',
    minutes > 0 || hours > 0 ? `${minutes}m ` : '',
    `${seconds}s`,
  ];
  return strings.join('');
};
