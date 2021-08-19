import React, { useState, useEffect } from "react";
import axios from "../axios";

function Bestbuy({ title, fetchUrl }) {
  const [products, setProducts] = useState([]);

  // Use Effect will load on the row , feed information- run once when the row loads
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setProducts(request.data.products);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(products);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="bestbuy_container">
        {products.map((product) => {
          return (
            <div className="element_styling">
              <img
                id="round_img"
                className="row_product "
                src={product.image}
                alt={product.name}
              />
              <br />
              <br />
              <br />
              <p> {product.name} </p>
              <br />
              <p> ${product.salePrice} </p>
              <br />
              <p> {product.shortDescription} </p>

              <form action={product.addToCartUrl} method="get">
                <button>Add to Cart</button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bestbuy;
