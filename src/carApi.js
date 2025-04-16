export async function getCars() {
    const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.cars;
};
 
export async function deleteCar(car) {
    const response = await fetch(car._links.car.href, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
};
 
export async function updateCar(car, link) {
    const response = await fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });
 
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    return response.json();
};
 
export async function addCar(car) {
    const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });
 
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    return response.json(); 
};