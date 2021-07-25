import '../Home/home.css'





function HomePage() {


    return (
        <>
        <h1 className="beach-it">
        <i className="fas fa-umbrella-beach"></i>
            Beachitt</h1>
            <div className="home-page">
                <div className="top-rentals">
                    <h2 className="home-sections">Most Rented Rentals</h2>

                </div>
                <div className="top-rated">
                    <h2 className="home-sections">Highest Rated Rental </h2>
                </div>
                <div className="cheapest">
                    <h2 className="home-sections">Most Budget Friendly</h2>
                </div>

            </div>
        </>

    )
}


export default HomePage;
