import React, { useEffect, useState } from "react";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";
import CheckoutAPI from "../API/CheckoutAPI";
import convertMoney from "../convertMoney";
import "./Checkout.css";

// import io from "socket.io-client";
// const socket = io("http://localhost:5000");

function Checkout(props) {
  const [carts, setCarts] = useState([]);

  const [total, setTotal] = useState(0);

  const [fullname, setFullname] = useState("");
  const [fullnameError, setFullnameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [emailRegex, setEmailRegex] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [success, setSuccess] = useState(false);

  const [load, setLoad] = useState(false);

  //Hàm này dùng để gọi API và render số sản phẩm

  useEffect(() => {
    const query =
      sessionStorage.getItem("currentuser") === null
        ? []
        : JSON.parse(sessionStorage.getItem("currentuser"));
    const fetchData = async () => {
      const response = await CartAPI.getCarts(query._id);
      //const carts = response.map((cart) => cart.product);
      setCarts(response);

      getTotal(response);
    };

    fetchData();
  }, []);

  //Hàm này dùng để tính tổng tiền carts
  function getTotal(carts) {
    let sub_total = 0;

    const sum_total = carts.map((value) => {
      return (sub_total +=
        parseInt(value.product.price) * parseInt(value.quantity));
    });

    setTotal(sub_total);
  }
  const onChangeName = (e) => {
    setFullname(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  //Check Validation

  const handlerSubmit = () => {
    if (!fullname) {
      setFullnameError(true);
      setEmailError(false);
      setPhoneError(false);
      setAddressError(false);
      return;
    } else {
      if (!email) {
        setFullnameError(false);
        setEmailError(true);
        setPhoneError(false);
        setAddressError(false);
        return;
      } else {
        setPhoneError(false);
        setAddressError(false);
        setFullnameError(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          setFullnameError(false);
          setEmailError(false);
          setPhoneError(false);
          setAddressError(false);
          return;
        } else {
          setEmailRegex(false);

          if (!phone) {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(true);
            setAddressError(false);
            return;
          } else {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(false);
            setAddressError(false);

            if (!address) {
              setFullnameError(false);
              setEmailError(false);
              setPhoneError(false);
              setAddressError(true);
            } else {
              console.log("Thanh Cong");

              setLoad(!load);
            }
          }
        }
      }
    }

    const product = carts.map((cart) => {
      return { product: cart.product, quantity: cart.quantity };
    });
    const query =
      sessionStorage.getItem("currentuser") === null
        ? []
        : JSON.parse(sessionStorage.getItem("currentuser"));

    const post = {
      name: fullname,
      email: email,
      phone: phone,
      address: address,
      userId: query._id,
      products: product,
      total: total,
    };
    const fetchData = async () => {
      const response = await CheckoutAPI.postEmail(post);
      console.log(response);
      //const carts = response.map((cart) => cart.product);
    };

    fetchData();
  };

  //Hàm này bắt đầu gửi Email xác nhận đơn hàng
  useEffect(() => {
    if (load) {
      const sendMail = async () => {
        const params = {
          to: email,
          fullname: fullname,
          phone: phone,
          address: address,
          idUser: localStorage.getItem("id_user"),
        };

        const query = "?" + queryString.stringify(params);

        const response = await CheckoutAPI.postEmail(query);

        console.log(response);
      };

      sendMail();

      const data = localStorage.getItem("id_user");

      // Gửi socket lên server
      // socket.emit("send_order", data);

      //Dùng setTimeout delay 3s
      //Sau 4s nó sẽ thực hiện
      setTimeout(() => {
        setSuccess(!success);
        setLoad(!load);
      }, 4000);
    }
  }, [load]);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div>
      {load && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}

      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Checkout</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="cart.html">Cart</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {!success && (
          <section className="py-5">
            <h2 className="h5 text-uppercase mb-4">Billing details</h2>
            <div className="row">
              <div className="col-lg-8">
                <form>
                  <div className="row">
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Fullname"
                      >
                        Full Name:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={fullname}
                        onChange={onChangeName}
                        type="text"
                        placeholder="Enter Your Full Name Here!"
                      />
                      {fullnameError && (
                        <span className="text-danger">
                          * Please Check Your Full Name!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Email"
                      >
                        Email:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={email}
                        onChange={onChangeEmail}
                        type="text"
                        placeholder="Enter Your Email Here!"
                      />
                      {emailError && (
                        <span className="text-danger">
                          * Please Check Your Email!
                        </span>
                      )}
                      {emailRegex && (
                        <span className="text-danger">
                          * Incorrect Email Format
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Phone"
                      >
                        Phone Number:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={phone}
                        onChange={onChangePhone}
                        type="text"
                        placeholder="Enter Your Phone Number Here!"
                      />
                      {phoneError && (
                        <span className="text-danger">
                          * Please Check Your Phone Number!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Address:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={address}
                        onChange={onChangeAddress}
                        type="text"
                        placeholder="Enter Your Address Here!"
                      />
                      {addressError && (
                        <span className="text-danger">
                          * Please Check Your Address!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <i
                        className="btn btn-dark"
                        style={{ color: "white" }}
                        type="submit"
                        onClick={handlerSubmit}
                      >
                        Place order
                      </i>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Your order</h5>
                    <ul className="list-unstyled mb-0">
                      {carts &&
                        carts.map((value) => (
                          <div key={value._id}>
                            <li className="d-flex align-items-center justify-content-between">
                              <strong className="small font-weight-bold">
                                {value.product.name}
                              </strong>
                              <br></br>
                              <span className="text-muted small">
                                {convertMoney(value.product.price)} VND x{" "}
                                {value.quantity}
                              </span>
                            </li>
                            <li className="border-bottom my-2"></li>
                          </div>
                        ))}
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>{convertMoney(total)} VND</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {success && (
          <section className="py-5">
            <div className="p-5">
              <h1>You Have Successfully Ordered!</h1>
              <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Checkout;
