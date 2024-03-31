import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Datas from "./Data";
import { Badge, Card } from "react-bootstrap";
import { createContext, useContext, useState } from "react";
const DispContext = createContext(null);
function Base() {
  const [cart, setCart] = useState(0);
  const [card, setCard] = useState([]);
  const [visible, setVisible] = useState(false);
  const [nums, setNums] = useState(1);
  const [cartdis, setCartdis] = useState(false);

  function handleEve(e, idx, ele) {
    if (e.target.innerText === "Add to cart") {
      setCart(cart + 1);
      e.target.innerText = "Remove from cart";
      e.target.className = "btn btn-danger";
      const updatedCard = [...card, ele];
      setCard(updatedCard);
      setVisible(true);
    } else {
      setCart(cart - 1);
      e.target.innerText = "Add to cart";
      e.target.className = "btn btn-primary";
      const rem = card.filter((a) => a !== ele);
      setCard(rem);
      if (rem.length < 1) {
        setVisible(false);
      }
    }
  }

  return (
    <div>
      <DispContext.Provider
        value={{
          cart,
          setCart,
          card,
          setCard,
          visible,
          setVisible,
          nums,
          setNums,
          handleEve,
          setCartdis,
          cartdis,
        }}
      >
        <header>
          <Headercomp />
        </header>
        <main className="main-container">
          <MainContentone />
          {visible ? <MainContenttwo /> : ""}
        </main>
      </DispContext.Provider>
    </div>
  );
}
export default Base;

function Headercomp() {
  const { cart } = useContext(DispContext);

  return (
    <>
      <Navbar variant="light" expand="lg" className="navcontainer" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src="./amazon.png" alt="amazon.in" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex" style={{ width: "75%" }}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                size="lg"
                style={{ width: "85%" }}
              />
              <Button variant="outline-success">Search</Button>
              <div style={{ marginLeft: "50px" }}>
                <i
                  class="fa-solid fa-cart-shopping fa-4x"
                  style={{ position: "relative" }}
                ></i>
                <Badge style={{ position: "absolute", left: 1045, top: 30 }}>
                  {cart}
                </Badge>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function MainContentone() {
  const { visible, handleEve } = useContext(DispContext);

  return (
    <>
      <div
        className="col1"
        style={{ marginTop: "96px", width: !visible ? "100vw" : "950px" }}
      >
        {Datas.map((ele, idx) => (
          <Card className="card-containers" key={idx}>
            <Card.Img
              className="card-images"
              variant="top"
              src={ele.thumbnail}
            />
            <Card.Body className="card-body">
              <Card.Title>{ele.title}</Card.Title>
              <Card.Text>{ele.description}</Card.Text>
              <Card.Text>${ele.price}</Card.Text>
              <Button variant="primary" onClick={(e) => handleEve(e, idx, ele)}>
                Add to cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
function MainContenttwo() {
  const { card, nums, setNums } = useContext(DispContext);
  function handleVal(e) {
    const num = parseInt(e.target.value);
    setNums(num);
  }

  return (
    <>
      <div className="col2" style={{ marginTop: "106px" }}>
        <h1>Cart items</h1>
        {card.length < 1
          ? ""
          : card.map((item, idx) => (
              <Card border="success" style={{ width: "18rem" }} key={idx}>
                <Card.Header>{item.title}</Card.Header>
                <Card.Body>
                  <img src={item.thumbnail} alt="" className="cart-img" />
                  <div className="carditems">
                    <select onChange={handleVal}>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </select>
                    <span>${item.price * nums}</span>
                  </div>
                </Card.Body>
                <Card.Header
                  style={{
                    textAlign: "left",
                  }}
                >
                  <p>
                    SUBTOTAL:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      ${item.price * nums}
                    </span>
                  </p>

                  <p>
                    SHIPPING:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: item.price * nums < 1000 ? "red" : "green",
                      }}
                    >
                      {item.price * nums < 1000 ? "$5" : "FREE"}
                    </span>
                  </p>
                </Card.Header>
                <Card.Header
                  style={{
                    textAlign: "left",
                  }}
                >
                  Total: $
                  <span style={{ color: "blue" }}>
                    {item.price * nums < 1000
                      ? item.price * nums + 5
                      : item.price * nums}
                  </span>
                </Card.Header>
              </Card>
            ))}
      </div>
    </>
  );
}
