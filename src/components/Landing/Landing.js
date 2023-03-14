import './style.scss';

const Landing = () => {
    return(
        <>
            <header>
                <div class="logo"></div>
                <div class="navMenu">
                    <ul class="nav">
                        <li>Home</li>
                        <li>Agencies</li>
                        <li>Experiences</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </header>
            <div className="contenedor">
            <div className="bgWithOverlay"></div>
            <div className="bgMidWithoutOverlayContainer">
                <div className="bgMidWithoutOverlay">
                    <div className="textLanding">
                        <h1>Create a perfect trip <br/> - with our planner</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc.
                            Viverra nam libero justo laoreet sit amet cursus sit amet.
                            Imperdiet proin fermentum leo vel orci. Eu sem integer vitae justo
                            eget magna fermentum iaculis eu.
                        </p>
                        <button>BUILD YOUR PLAN</button>
                    </div>
                    <div className="mainService">
                        <div className="serviceCard">
                            <h2>Experiencias<br/>Turisticas</h2>
                        </div>
                        <div className="serviceCard">
                            <h2>Hoteles y<br/>Alojamientos</h2>
                        </div>
                        <div className="serviceCard">
                            <h2>Expediciones<br/></h2>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
};
export default Landing;