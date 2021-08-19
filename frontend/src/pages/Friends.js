import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import "../css/FakerStyling.css";
import "../css/Friends.css";
//import { NavigateNextTwoTone } from "@material-ui/icons";
import StripeCheckout from "react-stripe-checkout";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";
const PAGE_FRIENDS = "friends";
const PAGE_USERS = "users";

const Friends = (props) => {
  const [message, setMessage] = useState("");
  const [items, getItems] = useState("");
  const [friends, getFriends] = useState("");
  const [addedfriends, pullFriends] = useState("");
  const [CurrentFriend, currFriends] = useState("");

  // Use states fro cart do no replicate
  const [cart, setCart] = useState("");
  const [page, setPage] = useState(PAGE_FRIENDS);
  const db = require("../components/db.js");
  var email;
  useEffect(() => {
    myfriends();
  }, []);
  function myfriends() {
    var ls = JSON.parse(localStorage.getItem("email"));
    var obj = {
      email: ls.email,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/pullfriends"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const friendslist = response.data.result;
          pullFriends(friendslist);
          if (friendslist.error) {
            setMessage(friendslist.error);
          } else {
            console.log("Friends list");
            console.log(friendslist);
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  }
  function getAllItems() {
    var obj = {
      email: email.value,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/wishlistfind"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const allItems = response.data.result;
          getItems(allItems);
          if (allItems.error) {
            setMessage(allItems.error);
          } else {
            console.log(allItems);
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
    var obj = {
      email: email.value,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/pullinfo"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const userInfo = response.data.result;
          console.log("User info from search:");
          console.log(userInfo);
          getFriends(userInfo);
          if (userInfo.error) {
            setMessage(userInfo.error);
          } else {
            getFriends(userInfo);
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  }

  // Map for the items in friends wishlist
  const maping = (props, index) => {
    if (items.length > 0) {
      return items.map((item) => {
        return (
          <div className="note_id" key={item.id}>
            <Col className="col-md-4 offset-md-6">
              <Card style={{ margin: 10, width: "250px", height: "250px" }}>
                <Card.Body>
                  <img
                    src={item.image}
                    alt="items_images"
                    width="40px"
                    height="40px"
                  />
                  <Card.Text className="item_title">{item.title}</Card.Text>
                  <Card.Text className="item_price">${item.price}</Card.Text>
                </Card.Body>
                <Button
                  variant="outline-success"
                  onClick={() => addToCart(item)}
                >
                  Add To Cart
                </Button>
              </Card>
            </Col>
          </div>
        );
      });
    }
  };

  // Display friends wishlist
  const displayItems = (allItems) => {
    return (
      <>
        <h4 className="pageHeaders">
          {CurrentUserNameAndLastName()} Wishlist Items
        </h4>
        <div className="mapDiv">
          <>{maping(props)}</>
        </div>
      </>
    );
  };

  // Map for shopping cart
  const mapingCart = (props, index) => {
    if (cart.length > 0) {
      return cart.map((item) => {
        return (
          <div className="note_id" key={item.id}>
            <Col className="col-md-3 offset-md-3">
              <Card style={{ margin: 10, width: "250px", height: "250px" }}>
                <Card.Body>
                  <img
                    src={item.image}
                    alt="items_images"
                    width="40px"
                    height="40px"
                  />
                  <Card.Text className="item_title">{item.title}</Card.Text>
                  <Card.Text className="item_price">${item.price}</Card.Text>
                </Card.Body>
                <Button
                  variant="outline-success"
                  onClick={() => removeFormCart(item)}
                >
                  Remove
                </Button>
              </Card>
            </Col>
          </div>
        );
      });
    }
  };
  function addItemsOnCart() {
    let totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
      totalPrice += Number(cart[i].price);
    }
    return totalPrice;
  }
  // Display shopping cart
  const displayCart = (allItems) => {
    return (
      <>
        <h4 className="pageHeaders">Cart</h4>
        <Col style={{ margin: 30 }}>
          <Card style={{ margin: 30 }}>
            <div className="mapDiv">
              <>{mapingCart(props)}</>
            </div>
            <StripeCheckout
              stripeKey="pk_test_51IkxFHC6q7MCzL7xXqhJgdpwNn18YOEsAawPtCzoinZMqSpOFr7WaUVHxKqqDckcBNadElth35R11whsu9KrjOtd00d3Ct8r4k"
              token={makePayment}
              name="Checkout"
              amount={addItemsOnCart() * 100}
              shippingAddress
              image
            >
              {" "}
              <Button className="checkout" variant="success" size="sm">
                Checkout
              </Button>
            </StripeCheckout>
          </Card>
        </Col>
      </>
    );
  };

  // Map for List of friends
  const mapingListFriends = (props, index) => {
    if (addedfriends.length > 0) {
      return addedfriends.map((item) => {
        return (
          <div className="note_id" key={item.id}>
            <Col className="col-md-3 offset-md-3">
              <Card style={{ margin: 2, width: "600px", height: "130px" }}>
                <Card.Body>
                  <Card.Text className="item_title">
                    {item.friendemail}
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="outline-success"
                  onClick={() => getFriendWishList(item.friendemail)}
                >
                  Wishlist
                </Button>
              </Card>
            </Col>
          </div>
        );
      });
    }
  };

  const displayListFriends = (allItems) => {
    return (
      <>
        <h4 className="pageHeaders">List of friends</h4>
        <div className="mapDiv">
          <>{mapingListFriends(props)}</>
        </div>
      </>
    );
  };

  function onClickFriend(friendEmail, type) {
    if (type == "Add to Friends") {
      console.log("Here 1");
      return addFriend(friendEmail);
    } else {
      console.log("Here 2");
      email.value = friendEmail;
      getAllItems();
      return getFriendWishList(friendEmail);
    }
  }
  function CurrentUserNameAndLastName() {
    // console.log("userInfo aaaaaaaaajjjjhh", currFriends);
    // console.log("friends.length", friends.length);
    // console.log("friends", friends);
    // var str = "";
    // // if (friends.length > 0) {
    // var x = friends.map((item) => {
    //   return item.firstName;
    // });
    // return friends.map((item) => {
    //   console.log("InsideMap", item.firstName);
    //   str = item.firstName;
    // });
    // }
    // console.log("x", x);
    //  var str = friends[0].firstName + " " + friends[0].lastName;
    // return str;
    if (friends.length > 0) {
      return friends.map((item) => {
        return (
          <div>
            <h2>{item.firstName}</h2>
          </div>
        );
      });
    }
  }
  function getFriendWishList(friendEmail) {
    email.value = friendEmail;
    currFriends(getAllItems());
    return navigateTo(PAGE_PRODUCTS);
  }
  function searchForusers() {
    getAllItems();
    navigateTo(PAGE_USERS);
  }
  function addFriend(friendEmail) {
    var ls = JSON.parse(localStorage.getItem("email"));
    var obj = {
      useremail: ls.email,
      friendemail: friendEmail,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/addfriend"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const errorcheck = response.data.result;
          getItems(errorcheck);
          if (errorcheck.error) {
            setMessage(errorcheck.error);
          } else {
            console.log(errorcheck);
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  }
  // Map for Friends
  var buttonName = "Add to Friends";
  const mapingFriends = (props, index) => {
    if (friends.length > 0) {
      return friends.map((user) => {
        for (var i = 0; i < addedfriends.length; i++) {
          if (user.email == addedfriends[i].friendemail) {
            buttonName = "View WishList";
          }
        }

        return (
          <div className="user_id" key={user.id}>
            <Col className="col-md-3 offset-md-3">
              <Card style={{ margin: 30, width: "700px", height: "150px" }}>
                <Card.Body>
                  <Card.Text className="item_title">
                    {user.firstName + " " + user.lastName}
                  </Card.Text>
                  <Card.Text className="item_price">{user.email}</Card.Text>
                </Card.Body>
                <Button
                  variant="outline-success"
                  onClick={() => onClickFriend(user.email, buttonName)}
                >
                  {buttonName}
                  {/* Add to Friends */}
                </Button>
              </Card>
            </Col>
          </div>
        );
      });
    }
  };

  const displayUsers = (infousers) => {
    return (
      <>
        <h4 className="pageHeaders">Zilla Users</h4>
        <>{mapingFriends(props)}</>
      </>
    );
  };

  // Add to shopping cart
  const addToCart = (product) => {
    console.log("We are in add to cart");
    setCart([...cart, { ...product }]);
  };

  // Remove from cart
  const removeFormCart = (productToRemove) => {
    console.log("We are in remove to cart");
    setCart(cart.filter((product) => product !== productToRemove));
  };

  // Change pages as I go
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const makePayment = (token) => {
    var obj = {
      token,
      cart,
    };

    //console.log(obj);
    var js = JSON.stringify(obj);
    try {
      // Axios post to database code follows
      var config = {
        method: "post",
        url: db.buildPath("api/payment"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          console.log("RESPONSE", response);
          const { status } = response;
          console.log("STATUS", status);
        })
        .catch(function (error) {
          //setMessage(error);
        });
    } catch (e) {
      //setMessage(e.message);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="backgroundDiv">
        <h4 className="pageHeaders">View your zilla mates wishlist!</h4>
        {/*----------------------- Search Container-------------------------- */}
        <Container>
          <Row className="justify-content-md-center">
            <Col md={{ span: 8 }} className=" my-5">
              <InputGroup>
                <FormControl
                  type="email"
                  placeholder="Your friends email"
                  className="mr-sm-2"
                  ref={(c) => (email = c)}
                />
                <InputGroup.Append>
                  <Button onClick={searchForusers} variant="outline-success">
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <header>
              <Col md={{ span: 4 }} className="col-md-3 offset-md-4">
                <Button
                  className="cartButton"
                  variant="success"
                  size="sm"
                  onClick={() => navigateTo(PAGE_CART)}
                >
                  Cart ({cart.length})
                </Button>
                {/* <Button
                  className="viewProducts"
                  variant="success"
                  size="sm"
                  onClick={() => navigateTo(PAGE_PRODUCTS)}
                >
                  View Products
                </Button> */}
                <Button
                  className="viewProducts"
                  variant="success"
                  size="sm"
                  onClick={() => navigateTo(PAGE_FRIENDS)}
                >
                  Friends
                </Button>
                {/* <Button
                  className="viewProducts"
                  variant="success"
                  size="sm"
                  onClick={() => navigateTo(PAGE_USERS)}
                >
                  Users
                </Button> */}
              </Col>
            </header>
          </Row>
        </Container>
        {page === PAGE_PRODUCTS && displayItems(props)}
        {page === PAGE_CART && displayCart(props)}
        {page === PAGE_FRIENDS && displayListFriends(props)}
        {page === PAGE_USERS && displayUsers(props)}
      </div>
    </div>
  );
};

export default Friends;
