/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Footer(props) {
	return (
		<footer className='bg-dark text-white'>
			<div className='container py-4'>
				<div className='row py-5'>
					<div className='col-md-4 mb-3 mb-md-0'>
						<h6 className='text-uppercase mb-3'>Customer services</h6>
						<ul className='list-unstyled mb-0'>
							<li>
								<a className='footer-link' href='#'>
									Help &amp; Contact Us
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Returns &amp; Refunds
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Online Stores
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Terms &amp; Conditions
								</a>
							</li>
						</ul>
					</div>
					<div className='col-md-4 mb-3 mb-md-0'>
						<h6 className='text-uppercase mb-3'>Company</h6>
						<ul className='list-unstyled mb-0'>
							<li>
								<a className='footer-link' href='#'>
									What We Do
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Available Services
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Latest Posts
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									FAQs
								</a>
							</li>
						</ul>
					</div>
					<div className='col-md-4'>
						<h6 className='text-uppercase mb-3'>Social media</h6>
						<ul className='list-unstyled mb-0'>
							<li>
								<a className='footer-link' href='#'>
									Twitter
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Instagram
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Facebook
								</a>
							</li>
							<li>
								<a className='footer-link' href='#'>
									Pinterest
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
