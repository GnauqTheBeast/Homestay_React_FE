const headerStyle: React.CSSProperties = {
    backgroundColor: '#001529',
    color: '#fff',
    padding: '20px',
    textAlign: 'center' as 'center',
    marginBottom: '40px'
};

const Header = () => {
    return (
        <>
            <header style={headerStyle}>
                <h1>Welcome to Our Homestay Platform</h1>
            </header>
        </>
    )
}

export default Header;