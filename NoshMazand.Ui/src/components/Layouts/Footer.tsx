const Footer = () => {
    return (
        <div>
            <p className="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-left pt-6">
                © {new Date().getFullYear()}. Diamond All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
