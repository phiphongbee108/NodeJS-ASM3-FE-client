import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import convertMoney from "../../convertMoney";
import CartAPI from "../../API/CartAPI";

ListCart.propTypes = {
  listCart: PropTypes.array,
  onDeleteCart: PropTypes.func,
  onUpdateCount: PropTypes.func,
};

ListCart.defaultProps = {
  listCart: [],
  onDeleteCart: null,
  onUpdateCount: null,
};

function ListCart(props) {
  const { listCart, onDeleteCart, onUpdateCount, setLoadAPI } = props;
  const [count, setCount] = useState(0);

  const handlerChangeText = (e) => {
    console.log(e.target.value);
  };

  const handlerDelete = (productId) => {
    const query =
      sessionStorage.getItem("currentuser") === null
        ? []
        : JSON.parse(sessionStorage.getItem("currentuser"));
    const post = { productId: productId };
    console.log(post);
    console.log(query._id);
    const fetchData1 = async () => {
      const response = await CartAPI.deleteToCart(query._id, post);
      console.log(response);
      setLoadAPI(true);
    };
    fetchData1();
  };

  const handlerDown = (getIdUser, getIdProduct, getCount) => {
    if (getCount === 1) {
      return;
    }
    const query =
      sessionStorage.getItem("currentuser") === null
        ? []
        : JSON.parse(sessionStorage.getItem("currentuser"));
    //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updateCount = parseInt(getCount) - 1;
    const post = { productId: getIdProduct, count: String(updateCount) };
    console.log(post);
    const fetchData2 = async () => {
      const response = await CartAPI.putToCart(query._id, post);
      console.log(response);
      setLoadAPI(true);
    };
    fetchData2();
  };

  const handlerUp = (getIdUser, getIdProduct, getCount) => {
    const query =
      sessionStorage.getItem("currentuser") === null
        ? []
        : JSON.parse(sessionStorage.getItem("currentuser"));
    //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updateCount = parseInt(getCount) + 1;
    const post = { productId: getIdProduct, count: String(updateCount) };
    console.log(post);
    const fetchData3 = async () => {
      const response = await CartAPI.putToCart(query._id, post);
      console.log(response);
      setLoadAPI(true);
    };
    fetchData3();
  };

  return (
    <div className="table-responsive mb-4">
      <table className="table">
        <thead className="bg-light">
          <tr className="text-center">
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Image</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Product</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Price</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Quantity</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Total</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Remove</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {listCart &&
            listCart.map((value, index) => (
              <tr className="text-center" key={index}>
                <td className="pl-0 border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor d-block animsition-link"
                      to={`/detail/${value.product._id}`}
                    >
                      <img src={value.product.img1} alt="..." width="70" />
                    </Link>
                  </div>
                </td>
                <td className="align-middle border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor h6 animsition-link"
                      to={`/detail/${value.product._id}`}
                    >
                      {value.product.name}
                    </Link>
                  </div>
                </td>

                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {convertMoney(value.product.price)} VND
                  </p>
                </td>
                <td className="align-middle border-0">
                  <div className="quantity justify-content-center">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handlerDown(
                          value._id,
                          value.product._id,
                          value.quantity
                        )
                      }
                    >
                      <i className="fas fa-caret-left"></i>
                    </button>
                    <input
                      className="form-control form-control-sm border-0 shadow-0 p-0"
                      type="text"
                      value={value.quantity}
                      onChange={handlerChangeText}
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handlerUp(
                          value.idUser,
                          value.product._id,
                          value.quantity
                        )
                      }
                    >
                      <i className="fas fa-caret-right"></i>
                    </button>
                  </div>
                </td>
                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {convertMoney(
                      parseInt(value.product.price) * parseInt(value.quantity)
                    )}{" "}
                    VND
                  </p>
                </td>
                <td className="align-middle border-0">
                  <button onClick={() => handlerDelete(value.product._id)}>
                    <a
                      className="reset-anchor remove_cart"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-trash-alt small text-muted"></i>
                    </a>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCart;
