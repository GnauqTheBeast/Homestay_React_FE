import { Carousel } from "antd";

const pageContainerStyle: React.CSSProperties = {
    backgroundColor: '#f0f2f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
};

const sectionStyle: React.CSSProperties = {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const titleContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
};

const titleStyle: React.CSSProperties = {
    textAlign: 'start',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333'
};

const carouselContainerStyle: React.CSSProperties = {
    margin: '0 auto'
};

const contentStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '5px',
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '5px'
};

const imageStyle: React.CSSProperties = {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '10px'
};

type CarouselComponentsProps = {
    props: HomestayResponse[];
    title: string;
}

type HomestayResponse = {
    name: string;
    images: string;
};

const CarouselComponents = ({ props, title }: CarouselComponentsProps) => {

    return (
        <>  
            <div style={pageContainerStyle}>
                <div className="carousel-wrapper" style={sectionStyle}>
                    <div className="carousel-container">
                        <div style={titleContainerStyle}>
                            <h2 style={titleStyle}>{ title }</h2>
                        </div>
                        <Carousel autoplay style={carouselContainerStyle}>
                            {props.map((item, index) => (
                                <div key={index} style={{ position: 'relative' }}>
                                    <h3 style={{
                                        ...contentStyle,
                                        position: 'absolute',
                                        bottom: '10px',
                                        left: '10px',
                                        color: 'white',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        padding: '5px'
                                    }}>{item.name}</h3>
                                    <img src={item.images} alt={item.name} style={imageStyle} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CarouselComponents;