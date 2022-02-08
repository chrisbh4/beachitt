import "../SplashPage/splashPage.css"


function SplashPage(){

/*
    TODO
        - Have an overflow-y scroll and add 10 images under splashpage
            - Have a function call for getAllRentals and have a max-width , overflow-y
*/

    return (
        <div class='flex flex-col items-center  mt-20'>
        <div id="splash-container" class='w-1/2 text-center h-36 pt-6 '>
            <div class='flex  justify-center items-center'>
            <i id='splash-umbrella-1' className="fas fa-umbrella-beach"></i>
            <h1 class='text-4xl' >Beachitt</h1>
            <i id='splash-umbrella-2' className="fas fa-umbrella-beach"></i>

            </div>
            <p class='text-2xl mt-4  px-10' >Book some of the world's most luxurious beachfront rentals for your next getaway! </p>

        </div>
        <footer id='splash-footer' class='text-center h-15 w-1/2 pt-2  '>
                <p class='text-xl  pt-4 '>Christian Brown</p>
                <div class="text-2xl pb-3">
                    <a class='pr-2' href="https://www.linkedin.com/in/christian-brown-8770311ba/">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a class='pr-2' href="mailto:Chrismbh4@gmail.com">
                        <i class="fas fa-envelope-square"></i>
                    </a>

                    <a  href="https://github.com/chrisbh4">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default SplashPage;
