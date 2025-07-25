import Nav from '../components/Nav';
import ImageTrail from '../components/ImageTrail'
import Header from '../components/Header';
import Showcase from '../components/Showcase';
import BestGlasses from '../components/BestGlasses';
import Text from '../components/Text';
import Transition from '../components/Transition';
import Collections from '../components/Collections';
import ContactMini from '../components/ContactMini';

const Home = () => {


    return (
        <>

            {/* Video Section */}
            <Nav  />
            <div className="h-screen w-full bg-[#e5e5dd] relative">
                <div className="h-full w-full overflow-hidden" >
                    <Header />
                    <ImageTrail
                        items={[
                            "/images/3.jpg",
                            "/images/6.jpg",
                            "/images/5.jpg",
                            "/images/1.jpg",
                            "/images/2.jpg",
                            "/images/4.jpg",
                            "/images/7.jpg",
                            "/images/8.jpg",
                            "/images/9.jpg",
                            "/images/1.jpg",
                        ]}
                        variant={1}
                    />
                </div >
            </div >
                        
            <div className='font-final'>
            <Showcase/>
            </div>
            <BestGlasses/>
            <Text/>
            <Collections/>
            <ContactMini isHome={true}/>
        </>
    );
};

export default Transition(Home);
