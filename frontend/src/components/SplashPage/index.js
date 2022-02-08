import "../SplashPage/splashPage.css"


function SplashPage(){

/*
    TODO
        - Have an overflow-y scroll and add 10 images under splashpage
*/

    return (
        <div class='flex justify-center mt-20'>
        <div id="splash-container" class='w-1/2 text-center h-36 pt-6 '>
            <h1 class='text-4xl' >Beachitt</h1>
            <p class='text-2xl mt-4' >Book some of the worlds most luxurious beach front properties for you next vacation </p>

        <footer class='text-center h-15 '>
                <p class='text-xl'>Christian Brown</p>
                <div class="text-2xl">
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
        </div>
    )
}

export default SplashPage;
