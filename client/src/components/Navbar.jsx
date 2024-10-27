function Navbar() {
    const navLinkStyles = {
        color: "white",
        margin:"5px 8px",        
        textDecoration:"none",
        textAlign:"center",
        fontFamily: "Alegreya, serif",
        fontSize:"1.2rem"
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{margin:0, backgroundColor:"#FFD717", background:"linear-gradient(90deg, rgba(22,13,28,1) 40%, rgba(255,215,23,1) 100%)", boxShadow:"5px 0px 7px 2px grey"}}>
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="#">Navbar</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li style={{...navLinkStyles}}>
                                <a  aria-current="page" href="/">Home</a>
                            </li>
                            <li style={{...navLinkStyles}} >
                                <a href="#">Social Invites</a>
                            </li>
                            <li style={{...navLinkStyles}}>
                                <a  href="#">Call Logs</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar