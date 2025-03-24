export const getImage = (imageName) => {
  try {
    return new URL(`../assets/images/${imageName}`, import.meta.url).href;
  } catch (error) {
    console.error(`Image not found: ${imageName}`);
    return null;
  }
};
