import React from 'react';

export default function AboutUs() {
    return (
        <section className="bg-[var(--card)] p-6 rounded-lg shadow-nature">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 animate-bounce">About Us</h1>
                    <p className="text-lg md:text-xl">
                        Welcome to the Suncat Distribution Network, where we are committed to providing quality food products from manufacturer to distributor to end user. We are a family-owned Close Corporation established in 2003 by the Founding Fathers. Our mission is excellence in service delivery, a standard we have maintained since our inception.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-[var(--card)] p-6 rounded-lg shadow-nature">
                        <h2 className="text-2xl font-semibold mb-4 ">Our Mission</h2>
                        <p>
                            Our unique establishment places us in a strategic position between end users and larger corporations through business relations forged over two decades of strong workmanship, preexisting corporate experience, and orthodox methodology. As the world moves towards a globalized economic environment powered by technology, our mission is to align with the demands of the modern foodservices and hospitality industry.
                        </p>
                    </div>

                    <div className="bg-[var(--card)] p-6 rounded-lg shadow-nature">
                        <h2 className="text-2xl font-semibold mb-4">Our Offices</h2>
                        <p>
                            Located in Kwazulu Natal, our warehouse is situated in Phoenix Industrial Park where the bulk of our day-to-day operations are executed. Due to operational hours, all visitation is subject to negotiation with the warehouse to ensure efficient servicing of our existing clients and coordination with the operational activities of our neighbors within the office park.
                        </p>
                    </div>

                    {/* Hidden for now */}
                    <div className="bg-[var(--card)] p-6 rounded-lg shadow-nature">
                        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                        <p>
                            Our organization comprises multidimensional experts spanning various disciplines from the South African Economy, including Wholesale, Distribution and Foodservices, Finance, Accounting & Auditing, Primary Medical Health Care, Media & Journalism, Information and Communications Technology & Law.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
                    <p className="text-lg">
                        Have questions or need more information? Feel free to reach out to us at <a href="mailto:contact@suncatdistribution.com" className="text-teal-400 hover:underline">info@suncat.co.za</a> or visit our warehouse at Phoenix Industrial Park, Kwazulu Natal. We look forward to serving you and being a part of your community.
                    </p>
                </div>
            </div>
        </section>
    );
}
