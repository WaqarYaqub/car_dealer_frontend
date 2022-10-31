// import React from 'react';




// const DashboardHome = ({ dashboardData }) => {
//     return (
//         <div>
//             <div className="row  g-3 my-2 text-white">
//                 <div className="col-lg-6 col-xl-3">
//                     <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: '#3984ff' }}>
//                         <div>
//                             <h3 className="fs-2">{dashboardData.cars}</h3>
//                             <p className="fs-5">Cars</p>
//                         </div>
//                         <i className="fas fa-car fs-2 primary-text border rounded-full secondary-bg p-3"></i>
//                     </div>
//                 </div>

//                 <div className="col-lg-6 col-xl-3">
//                     <div className="p-3  shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: '#fa5649' }}>
//                         <div>
//                             <h3 className="fs-2">{dashboardData.users}</h3>
//                             <p className="fs-5">Users</p>
//                         </div>
//                         <i
//                             className="fas fa-users fs-2 primary-text border rounded-full secondary-bg p-3"></i>
//                     </div>
//                 </div>

//                 <div className="col-lg-6 col-xl-3">
//                     <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: '#ffa113' }}>
//                         <div>
//                             <h3 className="fs-2">{dashboardData.orders}</h3>
//                             <p className="fs-5">Orders</p>
//                         </div>
//                         <i className="fas fa-box fs-2 primary-text border rounded-full secondary-bg p-3"></i>
//                     </div>
//                 </div>

//                 <div className="col-lg-6 col-xl-3">
//                     <div className="p-3  shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: '#5a00dd' }}>
//                         <div>
//                             <h3 className="fs-2">{dashboardData.reviews}</h3>
//                             <p className="fs-5">Reviews</p>
//                         </div>
//                         <i className="fas fa-pen fs-2 primary-text border rounded-full secondary-bg p-3"></i>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default DashboardHome;

import React from "react";
import "../../../styles/dashboard.css";
import SingleCard from "../../../components/reuseable/SingleCard";

import MileChart from "../../../charts/MileChart";
import CarStatsChart from "../../../charts/CarStatsChart";
import RecommendCarCard from "../../../components/UI/RecommendCarCard";

import recommendCarsData from "../../../assets/dummy-data/recommendCars";
import useAuth from '../../../../src/hooks/useAuth';


const Dashboard = ({dashboardData}) => {
  const { user, admin, adminLoading } = useAuth();
  console.log("🚀 ~ file: DashboardHome.js ~ line 72 ~ Dashboard ~ admin", admin)
  console.log("🚀 ~ file: DashboardHome.js ~ line 72 ~ Dashboard ~ user", user)


    const carObj = {
        title: "Total Cars",
        totalNumber: dashboardData.cars,
        icon: "ri-police-car-line",
      };
      
      const tripObj = {
        title: "Total Users",
        totalNumber: dashboardData.users,
        icon: "ri-steering-2-line",
      };
      
      const clientObj = {
        title: "Orders",
        totalNumber: dashboardData.orders,
        icon: "ri-user-line",
      };
      
      const distanceObj = {
        title: "Reviews",
        totalNumber: dashboardData.reviews,
        icon: "ri-timer-flash-line",
      };

  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">Miles Statistics</h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Car Statistics</h3>
            <CarStatsChart />
          </div>
        </div>

        <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

