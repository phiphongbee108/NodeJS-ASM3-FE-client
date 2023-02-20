import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import convertMoney from '../../convertMoney';

Products.propTypes = {
	products: PropTypes.array,
	sort: PropTypes.string,
};

Products.defaultProps = {
	products: [],
	sort: '',
};

function Products(props) {
	const { products, sort } = props;

	if (sort === 'DownToUp') {
		products.sort((a, b) => {
			return a.price - b.price;
		});
	} else if (sort === 'UpToDown') {
		products.sort((a, b) => {
			return b.price - a.price;
		});
	}

	return (
		<div className='row'>
			{/* -------------Product----------------- */}
			{products &&
				products.map((value) => (
					<div
						className='col-lg-4 col-sm-6 Section_Category'
						key={value._id}>
						<div className='product text-center'>
							<div className='position-relative mb-3'>
								<div className='badge text-white badge-'></div>
								<Link className='d-block' to={`/detail/${value._id}`}>
									<img
										className='img-fluid w-100'
										src={value.img1}
										alt='...'
									/>
								</Link>
								<div className='product-overlay'>
									<ul className='mb-0 list-inline'></ul>
								</div>
							</div>
							<h6>
								{' '}
								<a className='reset-anchor' href='detail.html'>
									{value.name}
								</a>
							</h6>
							<p className='small text-muted'>
								{convertMoney(value.price)} VND
							</p>
						</div>
					</div>
				))}
			{/* -------------Product----------------- */}
		</div>
	);
}

export default Products;
