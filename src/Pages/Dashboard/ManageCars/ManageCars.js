import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import Car from '../../Shared/Car/Car';
import {BASE_URL} from '../../../Utiles/constants';
import useAuth from '../../../../src/hooks/useAuth';

const ManageCars = () => {

    const { user, admin, adminLoading,isSeller  } = useAuth();
    console.log("🚀 ~ file: ManageCars.js ~ line 13 ~ ManageCars ~ user", user)
    const [cars, setCars] = useState([]);

    useEffect(() => {
            if(isSeller === true){
                fetch(`${BASE_URL}seller-cars?email=${user.email}`)
                .then(res => res.json())
                .then(cars => setCars(cars))
                console.log("====good====")
                console.log("🚀 ~ file: ManageCars.js ~ line 21 ~ useEffect ~ cars", cars)
                
            }
            else{
                if(admin === true){
        fetch(`${BASE_URL}cars`)
            .then(res => res.json())
            .then(cars => setCars(cars))
            console.log("====bad====")
            }
        }
    }
    , [])


    const handleDeleteCar = id => {
        swal({
            title: "Are you sure?",
            text: `Car will be removed from website`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const url = `${BASE_URL}cars/${id}`;
                    fetch(url, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                const remainingOrders = cars.filter(order => order._id !== id);
                                setCars(remainingOrders);
                            }
                        })
                    swal("Car Removed Successfully", {
                        icon: "success",
                    });

                }
            });
    }

console.log("dddddddd")
    return (
        <div>
            {
                cars.length
                    ?

                    <Container className="mt-4">
                        <section className="my-5">
                            <Row xs={1} lg={2} xl={3} className="g-4">
                                {
                                    cars.map(car => <Car
                                        key={car._id}
                                        car={car}
                                        handleDeleteCar={handleDeleteCar}
                                    ></Car>)
                                }
                            </Row>
                        </section>
                    </Container>
                    :
                    <div class="spinner d-flex align-items-center justify-content-center">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
            }
        </div>
    );
};

export default ManageCars;