export const createStyles = (styles) => {
    const style = document.createElement('style');
    style.innerHTML = styles;
    return style;
};