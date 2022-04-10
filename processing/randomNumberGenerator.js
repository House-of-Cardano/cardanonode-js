function between(min, max) {
  console.log(Math.floor(Math.random() * (max - min) + min));
  return Math.floor(Math.random() * (max - min) + min);
}

between(1, 50);
