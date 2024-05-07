import React from 'react';

const Profile = () => {
  const userDetails = {
    accountInformation: [
      { label: 'Full Name:', value: 'John Doe' },
      { label: 'Email:', value: 'john.doe@example.com' },
      { label: 'Phone Number:', value: '+1 123 456 7890' },
    ],
    addressInformation: [
      { label: 'Address:', value: '123 Main St' },
      { label: 'City:', value: 'Anytown' },
      { label: 'Country:', value: 'United States' },
      { label: 'Postal Code:', value: '12345' },
    ],
  };

  const orders = [
    {
      id: 1,
      date: '2024-05-01',
      total: 120.00,
      status: 'Delivered'
    },
    {
      id: 2,
      date: '2024-04-20',
      total: 89.99,
      status: 'Shipped'
    },
    // Add more orders as needed
  ];

  return (
    <div className="container mx-auto my-10 px-4 py-8 rounded-lg bg-black">
      <h1 className="text-3xl font-bold mb-4 text-prim">Welcome </h1>
      <div className="bg-gray-900 p-4 rounded-lg shadow-md text-prim">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        {userDetails.accountInformation.map((info, index) => (
          <div key={index} className="flex justify-between mb-2">
            <p className="text-prim">{info.label}</p>
            <p className="text-white">{info.value}</p>
          </div>
        ))}
        <hr className="my-4" />
        <h2 className="text-xl font-semibold mb-4 text-prim">Address Information</h2>
        {userDetails.addressInformation.map((info, index) => (
          <div key={index} className="flex justify-between mb-2">
            <p className="text-prim">{info.label}</p>
            <p className="text-white">{info.value}</p>
          </div>
        ))}

        <hr className="my-4" />
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-prim">Order History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{order.date}</td>
                    <td className="border px-4 py-2">${order.total.toFixed(2)}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
