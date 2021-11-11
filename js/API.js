const baseURL = 'http://localhost:3000';

class API {
  static fetchCars = (success, failure) => {
    setTimeout(() => {
      fetch(`${baseURL}/cars`)
      .then(res => res.json())
      .then(success)
      .catch(failure)
    }, 1000);
  }
  static deleteCar = (id, success, failure) => {
    fetch(`${baseURL}/cars/${id}`, { method: 'DELETE' })
      .then(res => res.ok ? success() : failure(res.statusText))
      .catch(failure)
  }
}

// API.fetchCars(
//   console.log,
//   console.error
// )

// API.deleteCar(
//   "1",
//   () => console.log('Ištrinta sėkmingai'),
//   console.error
// )