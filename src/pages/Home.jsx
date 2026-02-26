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
  "https://ik.imagekit.io/lenskartclone/images/5.jpg?updatedAt=1752921663826",
  "https://ik.imagekit.io/lenskartclone/images/1.jpg?updatedAt=1752921663285",
  "https://ik.imagekit.io/lenskartclone/images/6.jpg?updatedAt=1752921663747",
  "https://ik.imagekit.io/lenskartclone/images/8.jpg?updatedAt=1752921663025",
  "https://ik.imagekit.io/lenskartclone/images/9.jpg?updatedAt=1752921662522",

  // newly added 👇
  "https://ik.imagekit.io/lenskartclone/images/7.jpg?updatedAt=1752921662641",
  "https://ik.imagekit.io/lenskartclone/images/3.jpg?updatedAt=1752921663684",
  "https://ik.imagekit.io/lenskartclone/images/4.jpg?updatedAt=1752921663327",
  "https://ik.imagekit.io/lenskartclone/images/2.jpg?updatedAt=1752921663401"
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
