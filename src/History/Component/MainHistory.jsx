import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HistoryAPI from "../../API/HistoryAPI";
import convertMoney from "../../convertMoney";

function MainHistory(props) {
  const [listCart, setListCart] = useState([]);
  const query =
    sessionStorage.getItem("currentuser") === null
      ? []
      : JSON.parse(sessionStorage.getItem("currentuser"));
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryAPI.getHistoryAPI(query._id);
      console.log(response);

      setListCart(response);
    };

    fetchData();
  }, [query._id]);
  console.log(listCart);

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">History</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active">History</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="table-responsive pt-5 pb-5">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">ID Order</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">ID User</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Name</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Phone</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Address</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Total</strong>
              </th>

              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Detail</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {listCart &&
              listCart.map((value) => (
                <tr className="text-center" key={value._id}>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{value._id}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{value.userId}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{value.name}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{value.phone}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{value.address}</p>
                  </td>
                  <td className="align-middle border-0">
                    <p className="mb-0 small">{convertMoney(value.total)}VND</p>
                  </td>

                  <td className="align-middle border-0">
                    <Link
                      className="btn btn-outline-dark btn-sm"
                      to={`/history/${value._id}`}
                    >
                      View
                      <i className="fas fa-long-arrow-alt-right ml-2"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainHistory;
