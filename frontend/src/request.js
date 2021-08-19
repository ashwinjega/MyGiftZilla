const APIKEY = "VAbCbpESQG9QqGz8rl1zqCTz";

const requests = {
  searchFunction: `/products(search=arcade&search=games)?format=json&show=name,salePrice,shortDescription,color,image,addToCartUrl&pageSize=20&apiKey=${APIKEY}`,
  nintendoGames: `/products(search=nintendo&search=game)?format=json&show=name,salePrice,shortDescription,color,image,addToCartUrl&pageSize=20&apiKey=${APIKEY}`,
  xboxGames: `/products(search=xbox&search=controller)?format=json&show=name,salePrice,shortDescription,color,image,addToCartUrl&pageSize=20&apiKey=${APIKEY}`,
  playstationGames: `/products(search=playstation&search=controller)?format=json&show=name,salePrice,shortDescription,color,image,addToCart&pageSize=20&apiKey=${APIKEY}`,
};

export default requests;
